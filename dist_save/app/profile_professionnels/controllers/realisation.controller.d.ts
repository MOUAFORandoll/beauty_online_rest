import { RealisationResponseDto } from '../dto';
import { RealisationService } from '../providers';
import * as Database from '../../../databases/users/providers';
import { PaginationPayloadDto, PaginationResponseDto } from 'src/common/apiutils';
import { CreateRealisationDto, FindRealisationDto, UpdateRealisationDto } from '../dto/realisation.request.dto';
import { RealisationFileModel } from 'src/databases/services/entities';
export declare class RealisationController {
    private readonly realisationFileModel;
    private readonly realisationService;
    private readonly dbUsersService;
    constructor(realisationFileModel: RealisationFileModel, realisationService: RealisationService, dbUsersService: Database.UsersService);
    create(id: string, dto: CreateRealisationDto, images: Array<Express.Multer.File>): Promise<RealisationResponseDto>;
    findUserRealisation(idUser: string, pagination: PaginationPayloadDto): Promise<PaginationResponseDto<RealisationResponseDto>>;
    findProRealisation(idProfessionnel: string, pagination: PaginationPayloadDto): Promise<PaginationResponseDto<RealisationResponseDto>>;
    findRealisationFilter(filter: FindRealisationDto, pagination: PaginationPayloadDto): Promise<PaginationResponseDto<RealisationResponseDto>>;
    findAll(pagination: PaginationPayloadDto): Promise<PaginationResponseDto<RealisationResponseDto>>;
    update(id: string, idUser: string, dto: UpdateRealisationDto): Promise<RealisationResponseDto>;
    delete(id: string, idUser: string): Promise<void>;
}
