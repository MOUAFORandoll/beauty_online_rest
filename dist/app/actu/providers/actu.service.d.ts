import { Realisation, RealisationModel, RealisationFileModel, VueRealisationModel, ShareRealisationModel, LikeRealisationModel, ProfileProfessionnelModel, ProfileProfessionnel, RealisationVideoModel, RealisationVideo } from 'src/databases/main.database.connection';
import { PaginationPayloadDto } from 'src/common/apiutils';
import { ConfigService } from '@nestjs/config';
export declare class ActuService {
    private readonly vueModel;
    private readonly realisationModel;
    private readonly realisationVideoModel;
    private readonly shareModel;
    private readonly likeModel;
    private readonly profileModel;
    private readonly realisationFileModel;
    private configService;
    private self;
    constructor(vueModel: VueRealisationModel, realisationModel: RealisationModel, realisationVideoModel: RealisationVideoModel, shareModel: ShareRealisationModel, likeModel: LikeRealisationModel, profileModel: ProfileProfessionnelModel, realisationFileModel: RealisationFileModel, configService: ConfigService);
    findAll(pagination: PaginationPayloadDto): Promise<{
        data: Realisation[];
        total: number;
    }>;
    findOneById(id: string): Promise<Realisation>;
    findOneRealisationVideoById(id: string): Promise<RealisationVideo>;
    shareActu(actu_id: string, user_id: string): Promise<string>;
    vueActu(actu_id: string, user_id: string): Promise<void>;
    likeRealisation(userId: string, realisationId: string): Promise<void>;
    countLikes(realisationId: string): Promise<number>;
    hasLiked(userId: string, realisationId: string): Promise<boolean>;
    searchData(search: string): Promise<{
        total: number;
        realisations: Realisation[];
        profiles: ProfileProfessionnel[];
    }>;
}
