import { Notification, NotificationType } from 'src/databases/users/entities/notifications.schema';
import { AgendaModel, RealisationModel, RealisationFileModel, CreneauModel, RendezVousModel, RealisationVideoModel } from '../../../databases/services/entities';
import { PositionModel, ProfileProfessionnelModel, UserModel } from 'src/databases/users/entities';
import { ConfigService } from '@nestjs/config';
export declare class NotificationResponseDto {
    id: string;
    type: NotificationType;
    message: string;
    data: any;
    static fromNotification(notification: Notification, deps?: {
        rendezVousModel: RendezVousModel;
        userModel: UserModel;
        agendaModel: AgendaModel;
        realisationModel: RealisationModel;
        realisationFileModel: RealisationFileModel;
        realisationVideoModel: RealisationVideoModel;
        creneauModel: CreneauModel;
        profileModel: ProfileProfessionnelModel;
        positionModel: PositionModel;
        configService: ConfigService;
    }): Promise<NotificationResponseDto>;
    static fromNotificationBodyEmpty(notification: Notification): NotificationResponseDto;
    static fromNotificationRendezVous(notification: Notification, deps: {
        rendezVousModel: RendezVousModel;
        userModel: UserModel;
        agendaModel: AgendaModel;
        realisationModel: RealisationModel;
        realisationFileModel: RealisationFileModel;
        realisationVideoModel: RealisationVideoModel;
        creneauModel: CreneauModel;
        profileModel: ProfileProfessionnelModel;
        positionModel: PositionModel;
        configService: ConfigService;
    }): Promise<NotificationResponseDto>;
}
