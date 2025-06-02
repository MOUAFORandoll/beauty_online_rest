import { RealisationResponseDto } from '../dto';
import { RealisationService } from '../providers';
import * as Database from '../../../databases/users/providers';
import { PaginationPayloadDto, PaginationResponseDto } from 'src/common/apiutils';
import { CreateRealisationDto, CreateRealisationVideoDto, FindRealisationDto, UpdateRealisationDto } from '../dto/realisation.request.dto';
import { RealisationFileModel, RealisationVideoModel } from 'src/databases/services/entities';
import { ConfigService } from '@nestjs/config';
export declare class RealisationController {
    private readonly realisationFileModel;
    private readonly realisationVideoModel;
    private readonly realisationService;
    private readonly dbUsersService;
    private configService;
    private readonly localDirectory;
    constructor(realisationFileModel: RealisationFileModel, realisationVideoModel: RealisationVideoModel, realisationService: RealisationService, dbUsersService: Database.UsersService, configService: ConfigService);
    createWithImage(id: string, dto: CreateRealisationDto, files: Array<Express.Multer.File>): Promise<RealisationResponseDto>;
    createWithVideo(id: string, dto: CreateRealisationVideoDto, file: Express.Multer.File): Promise<RealisationResponseDto>;
    fakeData(): Promise<RealisationResponseDto[]>;
    findUserRealisation(idUser: string, pagination: PaginationPayloadDto): Promise<PaginationResponseDto<RealisationResponseDto>>;
    findProRealisation(idProfessionnel: string, pagination: PaginationPayloadDto): Promise<PaginationResponseDto<RealisationResponseDto>>;
    findRealisationFilter(filter: FindRealisationDto, pagination: PaginationPayloadDto): Promise<PaginationResponseDto<RealisationResponseDto>>;
    findAll(pagination: PaginationPayloadDto): Promise<PaginationResponseDto<RealisationResponseDto>>;
    update(id: string, idUser: string, dto: UpdateRealisationDto): Promise<RealisationResponseDto>;
    delete(id: string, idUser: string): Promise<void>;
}
