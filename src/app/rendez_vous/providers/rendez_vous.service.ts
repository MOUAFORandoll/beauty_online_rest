// rendezVous.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import {
    DATABASE_CONNECTION,
    RendezVous,
    RENDEZ_VOUS_MODEL_NAME,
    RendezVousModel,
    StatusRendezVous,
    REALISATION_MODEL_NAME,
    RealisationModel,
} from 'src/databases/main.database.connection';
import { PaginationPayloadDto } from 'src/common/apiutils';
import { CreateRendezVousDto } from '../dto/rendez_vous.request.dto';
import { RENDEZ_VOUS_DELETE_FAILED, RendezVousErrors } from '../errors';

import { PipelineStage, Types } from 'mongoose';

import { SendNotificationsService } from 'src/common/modules/notifications/providers';
import * as Database from '../../../databases/users/providers';
import { ProfileService } from 'src/app/profile_professionnels/providers';
@Injectable()
export class RendezVousService {
    constructor(
        @InjectModel(RENDEZ_VOUS_MODEL_NAME, DATABASE_CONNECTION)
        private readonly rendezVousModel: RendezVousModel,
        @InjectModel(REALISATION_MODEL_NAME, DATABASE_CONNECTION)
        private readonly realisationModel: RealisationModel,
        private readonly dbUsersService: Database.UsersService,
        private profileService: ProfileService,
        private readonly sendNotificationsService: SendNotificationsService,
    ) {}

    async create(dto: CreateRendezVousDto, user_id: string): Promise<RendezVous> {
        try {
            const rendezVous = new this.rendezVousModel({
                creneau_id: new Types.ObjectId(dto.creneau_id),
                realisation_id: new Types.ObjectId(dto.realisation_id),
                status: StatusRendezVous.ATTENTE,
                user_id: new Types.ObjectId(user_id),
            });
            // Ñotifications au prestataire

            await rendezVous.save();
            const realisation = await this.realisationModel.findById(rendezVous.realisation_id);
            const profile = await this.profileService.findOneById(
                realisation.profile_professionnel_id,
            );

            const user = await this.dbUsersService.getUser(profile.user_id);
            await this.sendNotificationsService.sendNewRdv(user, rendezVous._id.toString());

            return this.findRendezVousById(rendezVous.id);
        } catch (error) {
            throw new Error(`Failed to create rendezVous: ${error.message}`);
        }
    }

    async findUserRendezVous(
        user_id: string,

        pagination: PaginationPayloadDto,
    ): Promise<{ data: RendezVous[]; total: number }> {
        const [data, total] = await Promise.all([
            this.rendezVousModel
                .find({ user_id: user_id })
                .skip((pagination.page - 1) * pagination.size)
                .limit(pagination.size)
                .exec(),
            this.rendezVousModel.countDocuments({ user_id: user_id }).exec(),
        ]);

        return { data, total };
    }

    /**
     * Finds RendezVous for a specific professional profile (via Agenda) with pagination.
     * Assumes AgendaModel has a 'profile_professionnel_id' field.
     */
    async findPrestataireRendezVous(
        user_id: string,
        pagination: PaginationPayloadDto,
    ): Promise<{ data: RendezVous[]; total: number }> {
        try {
             const profile = await this.profileService.findUserProfile(user_id);
            if (!profile) {
                return { data: [], total: 0 };
            }
             const pipeline: PipelineStage[] = [
                // 1. Join with Creneau
                {
                    $lookup: {
                        from: 'creneaux',
                        localField: 'creneau_id',
                        foreignField: '_id',
                        as: 'creneau',
                    },
                },
                { $unwind: { path: '$creneau', preserveNullAndEmptyArrays: false } },

                // 2. Join with Agenda
                {
                    $lookup: {
                        from: 'agendas',
                        localField: 'creneau.agenda_id',
                        foreignField: '_id',
                        as: 'agenda',
                    },
                },
                { $unwind: { path: '$agenda', preserveNullAndEmptyArrays: false } },

                // 3. Filter by professionnel
                {
                    $match: {
                        'agenda.profile_professionnel_id': profile._id,
                    },
                },

                // 4. Facet for pagination + total count
                {
                    $facet: {
                        data: [
                            { $sort: { timeOfArrival: 1 } },
                            { $skip: (pagination.page - 1) * pagination.size },
                            { $limit: pagination.size },
                        ],
                        totalCount: [{ $count: 'count' }],
                    },
                },
            ];
            const result = await this.rendezVousModel.aggregate(pipeline).exec();

            const data = result[0]?.data ?? [];
            const total = result[0]?.totalCount[0]?.count ?? 0;

            return { data, total };
        } catch (error) {
            console.error(`Error during aggregation for prestataire ${user_id}:`, error);
            throw new Error(`Failed to fetch rendez-vous: ${error.message}`);
        }
    }

    /**
     * Finds a single RendezVous by its ID.
     * Helper function to avoid repetition.
     */
    private async findRendezVousById(id: string): Promise<RendezVous> {
        const rendezVous = await this.rendezVousModel.findById(id).exec();
        if (!rendezVous) {
            throw new NotFoundException(RendezVousErrors.RENDEZ_VOUS_NOT_FOUND);
        }
        return rendezVous;
    }

    /**
     * Accepts a RendezVous by setting its status to true.
     */
    async acceptRdv(id: string): Promise<RendezVous> {
        const rendezVous = await this.findRendezVousById(id);
        rendezVous.status = StatusRendezVous.ACCEPTER; // Assuming true means accepted
        const updatedRendezVous = await rendezVous.save();
        const user = await this.dbUsersService.getUser(updatedRendezVous.user_id);
        await this.sendNotificationsService.sendRdvAccepted(user, id);

        return updatedRendezVous;
    }

    /**
     * Declines a RendezVous by setting its status to false.
     */
    async declineRdv(id: string): Promise<RendezVous> {
        const rendezVous = await this.findRendezVousById(id);
        rendezVous.status = StatusRendezVous.REFUSER;
        const updatedRendezVous = await rendezVous.save();
        const user = await this.dbUsersService.getUser(updatedRendezVous.user_id);
        await this.sendNotificationsService.sendRdvRefused(user, id);

        return updatedRendezVous;
    }

    /**
     * Deletes a RendezVous by its ID.
     * Returns the DTO of the deleted item for confirmation.
     */
    async deleteRdv(id: string): Promise<boolean> {
        // First, find it to ensure it exists and to return its data

        // Now, perform the deletion
        const result = await this.rendezVousModel.deleteOne({ _id: id }).exec();

        if (result.deletedCount === 0) {
            // This case should ideally be caught by findRendezVousById, but double-check
            throw new NotFoundException(RENDEZ_VOUS_DELETE_FAILED);
        }

        return true; // Return the data of the object that was deleted
    }
}
