import { Realisation, RealisationModel, RealisationFileModel, VueRealisationModel, ShareRealisationModel, LikeRealisationModel } from 'src/databases/main.database.connection';
import { PaginationPayloadDto } from 'src/common/apiutils';
import { ConfigService } from '@nestjs/config';
export declare class ActuService {
    private readonly vueModel;
    private readonly realisationModel;
    private readonly shareModel;
    private readonly likeModel;
    private readonly realisationFileModel;
    private configService;
    private self;
    constructor(vueModel: VueRealisationModel, realisationModel: RealisationModel, shareModel: ShareRealisationModel, likeModel: LikeRealisationModel, realisationFileModel: RealisationFileModel, configService: ConfigService);
    findAll(pagination: PaginationPayloadDto): Promise<{
        data: Realisation[];
        total: number;
    }>;
    findOneById(id: string): Promise<Realisation>;
    shareActu(actu_id: string, user_id: string): Promise<string>;
    vueActu(actu_id: string, user_id: string): Promise<void>;
    likeRealisation(userId: string, realisationId: string): Promise<void>;
    countLikes(realisationId: string): Promise<number>;
    hasLiked(userId: string, realisationId: string): Promise<boolean>;
}
