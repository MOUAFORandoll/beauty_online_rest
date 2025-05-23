import { CreateProfileDto, FindByServiceDto, UpdateProfileDto } from '../dto';
import { PositionModel, ProfileProfessionnel, ProfileProfessionnelModel } from 'src/databases/users/entities';
import { PaginationPayloadDto } from 'src/common/apiutils';
import { UpdateUserPositionDto } from 'src/app/users/dto';
import { StorageService } from 'src/common/modules/aws/providers';
import { ConfigService } from '@nestjs/config';
export declare class ProfileService {
    private readonly positionModel;
    private readonly profileModel;
    private readonly storageService;
    private configService;
    private self;
    constructor(positionModel: PositionModel, profileModel: ProfileProfessionnelModel, storageService: StorageService, configService: ConfigService);
    create(dto: CreateProfileDto, user_id: string): Promise<ProfileProfessionnel>;
    findOneById(id: string): Promise<ProfileProfessionnel>;
    findUserProfile(userId: string): Promise<ProfileProfessionnel>;
    findProfileByFilter(filterService: FindByServiceDto, pagination: PaginationPayloadDto): Promise<{
        data: ProfileProfessionnel[];
        total: number;
    }>;
    findByProximity(longitude: string, latitude: string, pagination: PaginationPayloadDto): Promise<{
        data: ProfileProfessionnel[];
        total: number;
    }>;
    findAll(pagination: PaginationPayloadDto): Promise<{
        data: ProfileProfessionnel[];
        total: number;
    }>;
    update(id: string, dto: UpdateProfileDto): Promise<ProfileProfessionnel>;
    delete(id: string): Promise<{
        deleted: boolean;
        message?: string;
    }>;
    updateProfilePosition(profile_professionnel_id: string, dto: UpdateUserPositionDto): Promise<void>;
    updateProfileCover(photo: Express.Multer.File, id: string): Promise<ProfileProfessionnel>;
    shareProfile(profileId: string): string;
}
