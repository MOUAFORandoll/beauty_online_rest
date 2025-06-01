import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Notification, NotificationType } from 'src/databases/users/entities/notifications.schema';
import {
    AgendaModel,
    RealisationModel,
    RealisationFileModel,
    CreneauModel,
    RendezVousModel,
    RealisationVideoModel,
} from '../../../databases/services/entities';
import { PositionModel, ProfileProfessionnelModel, UserModel } from 'src/databases/users/entities';

import { RendezVousResponseDto } from 'src/app/rendez_vous/dto';
import { ConfigService } from '@nestjs/config';

export class NotificationResponseDto {
    @ApiProperty({ type: String, required: true })
    @IsNotEmpty()
    id: string;

    @ApiProperty({ enum: NotificationType, required: true })
    @IsNotEmpty()
    type: NotificationType;

    @ApiProperty({ type: String, required: true })
    @IsNotEmpty()
    message: string;

    @ApiProperty()
    data: any;

    /**
     * Point d'entrée principal pour convertir une Notification en DTO.
     */
    static async fromNotification(
        notification: Notification,
        deps?: {
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
        },
    ): Promise<NotificationResponseDto> {
        const typesRequérantChargementRdv = [
            NotificationType.NEW_RDV,
            NotificationType.RDV_ACCEPTED,
            NotificationType.RDV_REFUSED,
        ];

        if (typesRequérantChargementRdv.includes(notification.type)) {
            if (!deps) {
                throw new Error(
                    'Les dépendances nécessaires pour charger les données RDV ne sont pas fournies.',
                );
            }
            return this.fromNotificationRendezVous(notification, deps);
        }

        return this.fromNotificationBodyEmpty(notification);
    }

    static fromNotificationBodyEmpty(notification: Notification): NotificationResponseDto {
        return {
            id: notification._id.toString(),
            type: notification.type,
            message: notification.message,
            data: {},
        };
    }

    static async fromNotificationRendezVous(
        notification: Notification,
        deps: {
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
        },
    ): Promise<NotificationResponseDto> {
        const { rendezVousModel, ...models } = deps;
        const rendezVous = await rendezVousModel.findById(notification.ref_id).exec();

        if (!rendezVous) {
            throw new Error(`Rendez-vous introuvable pour l'ID: ${notification.ref_id}`);
        }

        const data = await RendezVousResponseDto.fromRendezVous(
            models.userModel,
            models.agendaModel,
            models.realisationModel,
            models.realisationFileModel,
            models.realisationVideoModel,
            models.creneauModel,
            models.profileModel,
            rendezVousModel,
            models.positionModel,
            rendezVous,
            deps.configService,
        );

        return {
            id: notification._id.toString(),
            type: notification.type,
            message: notification.message,
            data,
        };
    }
}
