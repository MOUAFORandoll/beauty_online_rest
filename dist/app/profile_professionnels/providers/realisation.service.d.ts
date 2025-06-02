import { Realisation, RealisationModel, RealisationFileModel, RealisationVideoModel } from 'src/databases/main.database.connection';
import { PaginationPayloadDto } from 'src/common/apiutils';
import { QueryOptions } from 'mongoose';
import { CreateRealisationDto, CreateRealisationVideoDto, FindRealisationDto, UpdateRealisationDto } from '../dto/realisation.request.dto';
import { ProfileService } from './profile.service';
import { StorageService } from 'src/common/modules/external/providers';
export declare class RealisationService {
    private readonly realisationModel;
    private readonly realisationFileModel;
    private readonly realisationVideoModel;
    private readonly profileService;
    private readonly storageService;
    constructor(realisationModel: RealisationModel, realisationFileModel: RealisationFileModel, realisationVideoModel: RealisationVideoModel, profileService: ProfileService, storageService: StorageService);
    createWithImages(dto: CreateRealisationDto, user_id: string): Promise<Realisation>;
    createWithVideo(dto: CreateRealisationVideoDto, user_id: string): Promise<Realisation>;
    findById(id: string): Promise<Realisation>;
    findUserRealisation(idUser: string, pagination: PaginationPayloadDto): Promise<{
        data: Realisation[];
        total: number;
    }>;
    findProfessionalRealisation(idProfessionnel: string, pagination: PaginationPayloadDto): Promise<{
        data: Realisation[];
        total: number;
    }>;
    findRealisationFilter(filter: FindRealisationDto, pagination: PaginationPayloadDto): Promise<{
        data: Realisation[];
        total: number;
    }>;
    findAll(pagination: PaginationPayloadDto): Promise<{
        data: Realisation[];
        total: number;
    }>;
    update(id: string, dto: UpdateRealisationDto, options?: QueryOptions): Promise<Realisation>;
    delete(id: string): Promise<boolean>;
    addFiles(id: string, images: Express.Multer.File[]): Promise<Realisation>;
    deleteFile(realisationId: string, fileId: string): Promise<Realisation>;
    private populateRealisationFiles;
    private sanitizeFilter;
}
