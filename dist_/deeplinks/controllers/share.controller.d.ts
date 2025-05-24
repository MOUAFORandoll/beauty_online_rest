import { ConfigService } from '@nestjs/config';
import { ProfileService } from 'src/app/profile_professionnels/providers';
import { ActuService } from 'src/app/actu/providers';
import { AgendaModel, RendezVousModel, RealisationFileModel, RealisationModel, PositionModel, VueModel, ShareModel } from 'src/databases/main.database.connection';
export declare class ShareController {
    private readonly configService;
    private readonly profileService;
    private readonly realisationFileModel;
    private readonly agendaModel;
    private readonly positionModel;
    private readonly realisationModel;
    private readonly rendezVousModel;
    private readonly vueModel;
    private readonly shareModel;
    private readonly actuService;
    htmlContent: string;
    appName: string;
    constructor(configService: ConfigService, profileService: ProfileService, realisationFileModel: RealisationFileModel, agendaModel: AgendaModel, positionModel: PositionModel, realisationModel: RealisationModel, rendezVousModel: RendezVousModel, vueModel: VueModel, shareModel: ShareModel, actuService: ActuService);
    findOneProById(id: string): Promise<string>;
    findOneActuById(id: string): Promise<string>;
    private fillTemplate;
}
