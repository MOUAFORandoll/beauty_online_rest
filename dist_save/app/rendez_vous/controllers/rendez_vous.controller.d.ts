import { RendezVousResponseDto } from '../dto';
import { RendezVousService } from '../providers';
import { PaginationPayloadDto, PaginationResponseDto } from 'src/common/apiutils';
import { CreateRendezVousDto } from '../dto/rendez_vous.request.dto';
import { AgendaModel, RealisationModel, UserModel, RealisationFileModel, CreneauModel, PositionModel, RendezVousModel, ProfileProfessionnelModel } from 'src/databases/main.database.connection';
export declare class RendezVousController {
    private readonly rendezVousService;
    private readonly userModel;
    private readonly agendaModel;
    private readonly realisationModel;
    private readonly realisationFileModel;
    private readonly creneauModel;
    private readonly profileModel;
    private readonly positionModel;
    private readonly rendezVousModel;
    constructor(rendezVousService: RendezVousService, userModel: UserModel, agendaModel: AgendaModel, realisationModel: RealisationModel, realisationFileModel: RealisationFileModel, creneauModel: CreneauModel, profileModel: ProfileProfessionnelModel, positionModel: PositionModel, rendezVousModel: RendezVousModel);
    create(userId: string, dto: CreateRendezVousDto): Promise<RendezVousResponseDto>;
    findUserRendezVous(userId: string, pagination: PaginationPayloadDto): Promise<PaginationResponseDto<RendezVousResponseDto>>;
    findPrestataireRendezVous(userId: string, pagination: PaginationPayloadDto): Promise<PaginationResponseDto<RendezVousResponseDto>>;
    acceptRdv(id: string): Promise<RendezVousResponseDto>;
    declineRdv(id: string): Promise<RendezVousResponseDto>;
    delete(id: string): Promise<void>;
}
