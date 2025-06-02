import { RendezVousResponseDto } from '../dto';
import { RendezVousService } from '../providers';
import { PaginationPayloadDto, PaginationResponseDto } from 'src/common/apiutils';
import { CreateRendezVousDto } from '../dto/rendez_vous.request.dto';
import { AgendaModel, RealisationModel, UserModel, RealisationFileModel, CreneauModel, PositionModel, RendezVousModel, ProfileProfessionnelModel, RealisationVideoModel } from 'src/databases/main.database.connection';
import { ConfigService } from '@nestjs/config';
export declare class RendezVousController {
    private readonly rendezVousService;
    private readonly userModel;
    private readonly agendaModel;
    private readonly realisationModel;
    private readonly realisationFileModel;
    private readonly realisationVideoModel;
    private readonly creneauModel;
    private readonly profileModel;
    private readonly positionModel;
    private readonly rendezVousModel;
    private readonly configService;
    constructor(rendezVousService: RendezVousService, userModel: UserModel, agendaModel: AgendaModel, realisationModel: RealisationModel, realisationFileModel: RealisationFileModel, realisationVideoModel: RealisationVideoModel, creneauModel: CreneauModel, profileModel: ProfileProfessionnelModel, positionModel: PositionModel, rendezVousModel: RendezVousModel, configService: ConfigService);
    create(userId: string, dto: CreateRendezVousDto): Promise<RendezVousResponseDto>;
    findUserRendezVous(userId: string, pagination: PaginationPayloadDto): Promise<PaginationResponseDto<RendezVousResponseDto>>;
    findPrestataireRendezVous(userId: string, pagination: PaginationPayloadDto): Promise<PaginationResponseDto<RendezVousResponseDto>>;
    fetchRdv(id: string): Promise<RendezVousResponseDto>;
    acceptRdv(id: string): Promise<RendezVousResponseDto>;
    declineRdv(id: string): Promise<RendezVousResponseDto>;
    delete(id: string): Promise<void>;
}
