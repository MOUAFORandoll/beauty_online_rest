// profile.service.ts
import { BadRequestException, HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateProfileDto, FindByServiceDto, UpdateProfileDto } from '../dto';
import {
    POSITION_MODEL_NAME,
    PositionModel,
    PROFILE_PRO_MODEL_NAME,
    ProfileProfessionnel,
    ProfileProfessionnelModel,
} from 'src/databases/users/entities';
import { PROFILE_PRO_NOT_FOUND, ProfileProErrors } from '../errors';
import { DATABASE_CONNECTION } from 'src/databases/main.database.connection';
import { PaginationPayloadDto } from 'src/common/apiutils';
import { QueryOptions } from 'mongoose';
import { UpdateUserPositionDto } from 'src/users/dto';
import { StorageService } from 'src/common/modules/aws/providers';

@Injectable()
export class ProfileService {
    constructor(
        @InjectModel(POSITION_MODEL_NAME, DATABASE_CONNECTION)
        private readonly positionModel: PositionModel,

        @InjectModel(PROFILE_PRO_MODEL_NAME, DATABASE_CONNECTION)
        private readonly profileModel: ProfileProfessionnelModel,
        private readonly storageService: StorageService,
    ) {}

    async create(dto: CreateProfileDto, user_id: string): Promise<ProfileProfessionnel> {
        try {
            console.log('=========');
            const profile = new this.profileModel({
                namePro: dto.namePro,
                description: dto.description,
                service: dto.service,

                user_id: user_id,
            });
            console.log('===ddd======');
            if (dto.cover) {
                profile.cover = await this.storageService.uploadCoverImage(
                    dto.cover,
                    profile._id.toString(),
                );
            }
            await profile.save();
            await this.updateProfilePosition(profile.id, {
                longitude: dto.longitude,
                latitude: dto.latitude,
                town: '',
                country: '',
                titleEmplacement: dto.titleEmplacement,
            });

            return this.findOneById(profile.id);
        } catch (error) {
            throw new Error(`Failed to create profile: ${error.message}`);
        }
    }

    async findOneById(id: string): Promise<ProfileProfessionnel> {
        const profile = await this.profileModel.findById(id).exec();

        if (!profile) {
            throw new HttpException(ProfileProErrors[PROFILE_PRO_NOT_FOUND], 203);
        }
        return profile;
    }

    async findUserProfile(userId: string): Promise<ProfileProfessionnel> {
        const profile = await this.profileModel.findOne({ user_id: userId }).exec();

        if (!profile) {
            // throw new HttpException(ProfileProErrors[PROFILE_PRO_NOT_FOUND], 203);

            throw new BadRequestException(ProfileProErrors[PROFILE_PRO_NOT_FOUND]);
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

    async findByProximity(
        longitude: string,
        latitude: string,
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

    async updateProfilePosition(
        profile_professionnel_id: string,
        dto: UpdateUserPositionDto,
    ): Promise<void> {
        const position = new this.positionModel({
            ...dto,
            profile_professionnel_id: profile_professionnel_id,
        });

        await position.save();
    }
}
