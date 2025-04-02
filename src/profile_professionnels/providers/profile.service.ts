// profile.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateProfileDto, FindByServiceDto, UpdateProfileDto } from '../dto';
import {
    PROFILE_PRO_MODEL_NAME,
    ProfileProfessionnel,
    ProfileProfessionnelModel,
} from 'src/databases/users/entities';
import { PROFILE_PRO_NOT_FOUND, ProfileProErrors } from '../errors';
import { DATABASE_CONNECTION } from 'src/databases/main.database.connection';
import { PaginationPayloadDto } from 'src/common/apiutils';
import { QueryOptions } from 'mongoose';

@Injectable()
export class ProfileService {
    constructor(
        @InjectModel(PROFILE_PRO_MODEL_NAME, DATABASE_CONNECTION)
        private readonly profileModel: ProfileProfessionnelModel,
    ) {}

    async create(dto: CreateProfileDto, user_id: string): Promise<ProfileProfessionnel> {
        try {
            const profile = new this.profileModel({ ...dto, user_id });
            return await profile.save();
        } catch (error) {
            throw new Error(`Failed to create profile: ${error.message}`);
        }
    }

    async findOneById(id: string): Promise<ProfileProfessionnel> {
        const profile = await this.profileModel.findById(id).exec();

        if (!profile) {
            throw new NotFoundException(ProfileProErrors[PROFILE_PRO_NOT_FOUND]);
        }
        return profile;
    }

    async findUserProfile(userId: string): Promise<ProfileProfessionnel> {
        const profile = await this.profileModel.findOne({ user_id: userId }).exec();

        if (!profile) {
            throw new NotFoundException(ProfileProErrors[PROFILE_PRO_NOT_FOUND]);
        }
        return profile;
    }

    async findProfileByFilter(
        filterService: FindByServiceDto,
        pagination: PaginationPayloadDto,
    ): Promise<{ data: ProfileProfessionnel[]; total: number }> {
        const [data, total] = await Promise.all([
            this.profileModel
                .find(filterService)
                .skip((pagination.page - 1) * pagination.size)
                .limit(pagination.size)
                .exec(),
            this.profileModel.countDocuments(filterService).exec(),
        ]);

        return { data, total };
    }

    async findAll(
        pagination: PaginationPayloadDto,
    ): Promise<{ data: ProfileProfessionnel[]; total: number }> {
        const [data, total] = await Promise.all([
            this.profileModel
                .find()
                .skip((pagination.page - 1) * pagination.size)
                .limit(pagination.size)
                .exec(),
            this.profileModel.countDocuments().exec(),
        ]);

        return { data, total };
    }

    async update(
        id: string,
        dto: UpdateProfileDto,
        options: QueryOptions = { new: true },
    ): Promise<ProfileProfessionnel> {
        const updatedProfile = await this.profileModel.findByIdAndUpdate(id, dto, options).exec();

        if (!updatedProfile) {
            throw new NotFoundException(ProfileProErrors[PROFILE_PRO_NOT_FOUND]);
        }
        return updatedProfile;
    }

    async delete(id: string): Promise<{ deleted: boolean; message?: string }> {
        const result = await this.profileModel.findByIdAndDelete(id).exec();

        if (!result) {
            throw new NotFoundException(ProfileProErrors[PROFILE_PRO_NOT_FOUND]);
        }

        return { deleted: true, message: 'Profile successfully deleted' };
    }
}
