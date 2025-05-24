import { ActuResponseDto } from '../dto';
import { ActuService } from '../providers';
import * as Database from '../../../databases/users/providers';
import { PaginationPayloadDto, PaginationResponseDto } from 'src/common/apiutils';
import { AgendaModel, RendezVousModel, RealisationFileModel, RealisationModel, VueRealisationModel, ShareRealisationModel, LikeRealisationModel } from 'src/databases/services/entities';
import { PositionModel } from 'src/databases/main.database.connection';
import { ProfileService } from 'src/app/profile_professionnels/providers';
import { ShareLink } from 'src/common/ClassActions/response.dto';
export declare class ActuController {
    private readonly realisationFileModel;
    private readonly actuService;
    private readonly agendaModel;
    private readonly positionModel;
    private readonly realisationModel;
    private readonly rendezVousModel;
    private readonly vueModel;
    private readonly shareModel;
    private readonly likeModel;
    private readonly profileService;
    private readonly dbUsersService;
    constructor(realisationFileModel: RealisationFileModel, actuService: ActuService, agendaModel: AgendaModel, positionModel: PositionModel, realisationModel: RealisationModel, rendezVousModel: RendezVousModel, vueModel: VueRealisationModel, shareModel: ShareRealisationModel, likeModel: LikeRealisationModel, profileService: ProfileService, dbUsersService: Database.UsersService);
    findAll(pagination: PaginationPayloadDto, userId: string): Promise<PaginationResponseDto<ActuResponseDto>>;
    findOneById(id: string, userId: string): Promise<ActuResponseDto>;
    shareActu(actuId: string, userId: string): Promise<ShareLink>;
    vueActu(actuId: string, userId: string): void;
    like(id: string, userId: string): Promise<void>;
    getLikeCount(id: string): Promise<number>;
}
