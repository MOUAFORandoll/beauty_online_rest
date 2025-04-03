// rendezVous.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import {
    DATABASE_CONNECTION,
    RendezVous,
    RENDEZ_VOUS_MODEL_NAME,
    RendezVousModel,
    AGENDA_MODEL_NAME,
    AgendaModel,
} from 'src/databases/main.database.connection';
import { PaginationPayloadDto } from 'src/common/apiutils';
import { CreateRendezVousDto } from '../dto/rendez_vous.request.dto';
import { RENDEZ_VOUS_DELETE_FAILED, RendezVousErrors } from '../errors';
import mongoose from 'mongoose';
@Injectable()
export class RendezVousService {
    constructor(
        @InjectModel(RENDEZ_VOUS_MODEL_NAME, DATABASE_CONNECTION)
        private readonly rendezVousModel: RendezVousModel,
        @InjectModel(AGENDA_MODEL_NAME, DATABASE_CONNECTION)
        private readonly agendaModel: AgendaModel,
    ) {}

    async create(dto: CreateRendezVousDto, user_id: string): Promise<RendezVous> {
        try {
            const rendezVous = new this.rendezVousModel({ ...dto }, user_id);
            return await rendezVous.save();
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
        profile_professionnel_id: string,
        pagination: PaginationPayloadDto,
    ): Promise<{ data: RendezVous[]; total: number }> {
        try {
            const profileObjectId = new mongoose.Types.ObjectId(profile_professionnel_id);

            // 1. Find Agendas linked to the professional profile
            const agendas = await this.agendaModel
                .find({ profile_professionnel_id: profileObjectId }, '_id') // Select only the IDs
                .exec();

            if (!agendas || agendas.length === 0) {
                return { data: [], total: 0 }; // No agendas found for this profile
            }

            const agendaIds = agendas.map((a) => a._id);

            // 2. Find RendezVous linked to these Agendas
            const query = { agenda_id: { $in: agendaIds } };

            const [rawRendezVous, total] = await Promise.all([
                this.rendezVousModel
                    .find(query)
                    .sort({ timeOfArrival: 1 }) // Optional: sort by arrival time
                    .skip((pagination.page - 1) * pagination.size)
                    .limit(pagination.size)
                    .exec(),
                this.rendezVousModel.countDocuments(query).exec(),
            ]);

            // 3. Map raw data to DTOs

            return { data: rawRendezVous, total: total };
        } catch (error) {
            console.error(
                `Error finding prestataire rendez-vous for profile ${profile_professionnel_id}:`,
                error,
            );
            // Depending on requirements, you might want to throw or return an empty result
            throw new Error(`Failed to find prestataire rendez-vous: ${error.message}`);
        }
    }

    /**
     * Finds a single RendezVous by its ID.
     * Helper function to avoid repetition.
     */
    private async findRendezVousById(id: string): Promise<RendezVous> {
        if (!mongoose.Types.ObjectId.isValid(id)) {
            throw new NotFoundException(`Invalid RendezVous ID format: ${id}`);
        }
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
        rendezVous.status = true; // Assuming true means accepted
        const updatedRendezVous = await rendezVous.save();

        return updatedRendezVous;
    }

    /**
     * Declines a RendezVous by setting its status to false.
     */
    async declineRdv(id: string): Promise<RendezVous> {
        const rendezVous = await this.findRendezVousById(id);
        rendezVous.status = false; // Assuming false means declined/pending
        // You might want a more specific status like 'DECLINED' if your schema supports it
        const updatedRendezVous = await rendezVous.save();

        return updatedRendezVous;
    }

    /**
     * Deletes a RendezVous by its ID.
     * Returns the DTO of the deleted item for confirmation.
     */
    async deleteRdv(id: string): Promise<boolean> {
        // First, find it to ensure it exists and to return its data

        // Now, perform the deletion
        const result = await this.rendezVousModel
            .deleteOne({ _id: new mongoose.Types.ObjectId(id) })
            .exec();

        if (result.deletedCount === 0) {
            // This case should ideally be caught by findRendezVousById, but double-check
            throw new NotFoundException(RENDEZ_VOUS_DELETE_FAILED);
        }

        return true; // Return the data of the object that was deleted
    }
}
