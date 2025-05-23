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
import { UpdateUserPositionDto } from 'src/app/users/dto';
import { StorageService } from 'src/common/modules/aws/providers';
import { Shareable, ShareableProperties } from 'src/common/ClassActions/action.shareable';
import { ConfigService } from '@nestjs/config';

@Injectable()
@Shareable({
    sharePath: 'professionnel',
})
export class ProfileService {
    private self: ProfileService & ShareableProperties;

    constructor(
        @InjectModel(POSITION_MODEL_NAME, DATABASE_CONNECTION)
        private readonly positionModel: PositionModel,

        @InjectModel(PROFILE_PRO_MODEL_NAME, DATABASE_CONNECTION)
        private readonly profileModel: ProfileProfessionnelModel,
        private readonly storageService: StorageService,
        private configService: ConfigService,
    ) {
        this.self = this as unknown as ProfileService & ShareableProperties;
    }

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
    async update(id: string, dto: UpdateProfileDto): Promise<ProfileProfessionnel> {
        const profile = await this.findOneById(id);
        console.log(dto);
        if (dto.name_pro) profile.namePro = dto.name_pro;
        if (dto.description) profile.description = dto.description;
        return profile.save();
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
    async updateProfileCover(
        photo: Express.Multer.File,
        id: string,
    ): Promise<ProfileProfessionnel> {
        try {
            const profile = await this.profileModel.findById(id).exec();

            if (!profile) {
                // throw new HttpException(ProfileProErrors[PROFILE_PRO_NOT_FOUND], 203);

                throw new BadRequestException(ProfileProErrors[PROFILE_PRO_NOT_FOUND]);
            }
            console.log(photo);
            console.log(id);
            if (photo) {
                profile.cover = await this.storageService.uploadCoverImage(
                    photo,
                    profile._id.toString(),
                );
            }
            return profile.save();
        } catch (error) {
            throw new Error(`Failed to create profile: ${error.message}`);
        }
    }

    shareProfile(profileId: string): string {
        return this.self.share(profileId.toString());
    }
}
