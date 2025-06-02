import { GeneralNotificationDto, NotificationResponseDto, ParticularNotificationDto } from '../dto';
import { NotificationsService } from '../providers/notifications.service';
import { PaginationPayloadDto, PaginationResponseDto } from 'src/common/apiutils';
import { AgendaModel, RealisationModel, UserModel, RealisationFileModel, CreneauModel, PositionModel, RendezVousModel, ProfileProfessionnelModel, RealisationVideoModel } from 'src/databases/main.database.connection';
import { ConfigService } from '@nestjs/config';
export declare class NotificationsController {
    private readonly notificationsService;
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
    constructor(notificationsService: NotificationsService, userModel: UserModel, agendaModel: AgendaModel, realisationModel: RealisationModel, realisationFileModel: RealisationFileModel, realisationVideoModel: RealisationVideoModel, creneauModel: CreneauModel, profileModel: ProfileProfessionnelModel, positionModel: PositionModel, rendezVousModel: RendezVousModel, configService: ConfigService);
    sendWelcomeNotification(userId: string): Promise<void>;
    sendGeneralNotification(body: GeneralNotificationDto): Promise<void>;
    sendNotificationToUser(body: ParticularNotificationDto): Promise<void>;
    findUserNotification(userId: string, pagination: PaginationPayloadDto): Promise<PaginationResponseDto<NotificationResponseDto>>;
}
