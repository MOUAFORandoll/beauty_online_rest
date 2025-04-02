// realisation.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import {
    DATABASE_CONNECTION,
    ProfileProfessionnel,
    Realisation,
    REALISATION_MODEL_NAME,
    RealisationModel,
} from 'src/databases/main.database.connection';
import { PaginationPayloadDto } from 'src/common/apiutils';
import { QueryOptions } from 'mongoose';
import {
    CreateRealisationDto,
    FindRealisationDto,
    UpdateRealisationDto,
} from '../dto/realisation.request.dto';
import {
    PROFILE_PRO_NOT_FOUND,
    ProfileProErrors,
    REALISATION_DELETE_FAILED,
    REALISATION_UPDATE_FAILED,
    RealisationErrors,
} from '../errors';
import { ProfileService } from './profile.service';

@Injectable()
export class RealisationService {
    constructor(
        @InjectModel(REALISATION_MODEL_NAME, DATABASE_CONNECTION)
        private readonly realisationModel: RealisationModel,

        private readonly profileService: ProfileService,
    ) {}

    async create(dto: CreateRealisationDto, user_id: string): Promise<Realisation> {
        try {
            const profilePro: ProfileProfessionnel =
                await this.profileService.findUserProfile(user_id);
            if (!profilePro) {
                throw new NotFoundException(ProfileProErrors[PROFILE_PRO_NOT_FOUND]);
            }
            const realisation = new this.realisationModel({ ...dto }, profilePro._id);
            return await realisation.save();
        } catch (error) {
            throw new Error(`Failed to create realisation: ${error.message}`);
        }
    }

    async findUserRealisation(
        user_id: string,

        pagination: PaginationPayloadDto,
    ): Promise<{ data: Realisation[]; total: number }> {
        const profilePro: ProfileProfessionnel = await this.profileService.findUserProfile(user_id);
        if (!profilePro) {
            throw new NotFoundException(ProfileProErrors[PROFILE_PRO_NOT_FOUND]);
        }
        const [data, total] = await Promise.all([
            this.realisationModel
                .find({ profile_professionnel_id: profilePro._id })
                .skip((pagination.page - 1) * pagination.size)
                .limit(pagination.size)
                .exec(),
            this.realisationModel
                .countDocuments({ profile_professionnel_id: profilePro._id })
                .exec(),
        ]);

        return { data, total };
    }

    async findRealisationFilter(
        filter: FindRealisationDto,
        pagination: PaginationPayloadDto,
    ): Promise<{ data: Realisation[]; total: number }> {
        const [data, total] = await Promise.all([
            this.realisationModel
                .find(filter)
                .skip((pagination.page - 1) * pagination.size)
                .limit(pagination.size)
                .exec(),
            this.realisationModel.countDocuments(filter).exec(),
        ]);

        return { data, total };
    }
    async findAll(
        pagination: PaginationPayloadDto,
    ): Promise<{ data: Realisation[]; total: number }> {
        const [data, total] = await Promise.all([
            this.realisationModel
                .find()
                .skip((pagination.page - 1) * pagination.size)
                .limit(pagination.size)
                .exec(),
            this.realisationModel.countDocuments().exec(),
        ]);

        return { data, total };
    }

    async update(
        id: string,
        dto: UpdateRealisationDto,
        options: QueryOptions = { new: true },
    ): Promise<Realisation> {
        const updatedRealisation = await this.realisationModel
            .findByIdAndUpdate(id, dto, options)
            .exec();

        if (!updatedRealisation) {
            throw new NotFoundException(RealisationErrors[REALISATION_UPDATE_FAILED]);
        }
        return updatedRealisation;
    }

    async delete(id: string): Promise<{ deleted: boolean; message?: string }> {
        const result = await this.realisationModel.findByIdAndDelete(id).exec();

        if (!result) {
            throw new NotFoundException(RealisationErrors[REALISATION_DELETE_FAILED]);
        }

        return { deleted: true, message: 'Realisation successfully deleted' };
    }
}
