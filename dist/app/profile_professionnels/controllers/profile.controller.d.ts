import { CreateProfileDto, UpdateProfileDto, ProfileResponseDto, FindByServiceDto } from '../dto';
import { ProfileService } from '../providers';
import * as Database from '../../../databases/users/providers';
import { PaginationPayloadDto, PaginationResponseDto } from 'src/common/apiutils';
import { UpdateUserPositionDto } from 'src/app/users/dto';
import { PositionModel } from 'src/databases/users/entities';
import { AgendaModel, RealisationModel, RendezVousModel } from 'src/databases/main.database.connection';
import { ShareLink } from 'src/common/ClassActions/response.dto';
export declare class ProfileController {
    private readonly profileService;
    private readonly agendaModel;
    private readonly positionModel;
    private readonly realisationModel;
    private readonly rendezVousModel;
    private readonly dbUsersService;
    constructor(profileService: ProfileService, agendaModel: AgendaModel, positionModel: PositionModel, realisationModel: RealisationModel, rendezVousModel: RendezVousModel, dbUsersService: Database.UsersService);
    create(id: string, dto: CreateProfileDto, cover?: Express.Multer.File): Promise<ProfileResponseDto>;
    findUserProfile(idUser: string): Promise<ProfileResponseDto>;
    findProfileByService(filterService: FindByServiceDto, pagination: PaginationPayloadDto): Promise<PaginationResponseDto<ProfileResponseDto>>;
    findOneById(id: string): Promise<ProfileResponseDto>;
    findAll(pagination: PaginationPayloadDto): Promise<PaginationResponseDto<ProfileResponseDto>>;
    findByProximity(longitude: string, latitude: string, pagination: PaginationPayloadDto): Promise<PaginationResponseDto<ProfileResponseDto>>;
    update(idUser: string, dto: UpdateProfileDto): Promise<ProfileResponseDto>;
    updateProfileCover(id: string, image?: Express.Multer.File): Promise<ProfileResponseDto>;
    updateUserPosition(id: string, payload: UpdateUserPositionDto): Promise<void>;
    delete(id: string, idUser: string): Promise<void>;
    shareProfile(actuId: string): ShareLink;
}
