import { ActuService } from '../providers';
import { RendezVousModel, RealisationModel, VueRealisationModel, ShareRealisationModel, LikeRealisationModel, RealisationVideoModel } from 'src/databases/services/entities';
import { ProfileService } from 'src/app/profile_professionnels/providers';
import { Request, Response } from 'express';
import { ConfigService } from '@nestjs/config';
export declare class StreamController {
    private readonly actuService;
    private readonly realisationModel;
    private readonly realisationVideoModel;
    private readonly rendezVousModel;
    private readonly vueModel;
    private readonly shareModel;
    private readonly likeModel;
    private readonly profileService;
    private configService;
    constructor(actuService: ActuService, realisationModel: RealisationModel, realisationVideoModel: RealisationVideoModel, rendezVousModel: RendezVousModel, vueModel: VueRealisationModel, shareModel: ShareRealisationModel, likeModel: LikeRealisationModel, profileService: ProfileService, configService: ConfigService);
    stream(id: string, req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    private handleRangeRequest;
    private handleFullFileStream;
}
