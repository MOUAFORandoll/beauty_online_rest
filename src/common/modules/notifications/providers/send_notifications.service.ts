import { Injectable, Logger } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { firstValueFrom } from 'rxjs';
import {
    NOTIFICATION_MODEL_NAME,
    NotificationModel,
    NotificationType,
} from 'src/databases/users/entities/notifications.schema';
import { DATABASE_CONNECTION, User } from 'src/databases/main.database.connection';
import { InjectModel } from '@nestjs/mongoose';
import { EmailService } from 'src/common/modules/external/providers';

interface NotificationPayload {
    token: string;
    title: string;
    body: string;
    data: {
        type: NotificationType;
        ref_id?: string;
        [key: string]: any;
    };
}

export const NotificationTypeDetails = {
    [NotificationType.WELCOME]: {
        title: 'Bienvenue sur Beauty',
        message: "Hey, bienvenue sur l'application Beauty en ligne !",
    },
    [NotificationType.GENERAL]: {
        title: 'Général',
        message: '',
    },
    [NotificationType.INFORMATION]: {
        title: 'Informations',
        message: '',
    },
    [NotificationType.NEW_RDV]: {
        title: 'Nouveau rendez-vous',
        message: 'Un nouveau rendez-vous a été planifié sur votre agenda.',
    },
    [NotificationType.RDV_ACCEPTED]: {
        title: 'Rendez-vous accepté',
        message: 'Votre rendez-vous a été accepté avec succès.',
    },
    [NotificationType.RDV_REFUSED]: {
        title: 'Rendez-vous refusé',
        message: 'Votre rendez-vous a été refusé. Veuillez en choisir un autre.',
    },
    [NotificationType.NEW_FEATURE]: {
        title: 'Nouveauté !',
        message: 'Découvrez les nouvelles fonctionnalités de Beauty !',
    },
    [NotificationType.BEST_CONSULTANTS]: {
        title: 'Top Prestataires',
        message: 'Découvrez les prestataires les mieux notés du moment !',
    },
} as const;

@Injectable()
export class SendNotificationsService {
    private readonly logger = new Logger(SendNotificationsService.name);

    constructor(
        @InjectModel(NOTIFICATION_MODEL_NAME, DATABASE_CONNECTION)
        private readonly notificationModel: NotificationModel,
        private readonly httpService: HttpService,
        private readonly configService: ConfigService,
        private readonly emailService: EmailService,
    ) {}

    private prepareNotification(
        type: NotificationType,
        token: string,
        extraData: Record<string, any> = {},
        overrideMessage?: string,
    ): NotificationPayload {
        const notif = NotificationTypeDetails[type];

        if (!notif) {
            throw new Error(`Type de notification inconnu : ${type}`);
        }

        return {
            token,
            title: notif.title,
            body: overrideMessage || notif.message,
            data: {
                type,
                ...extraData, // ref_id inclus ici
            },
        };
    }

    private async sendNotification(payload: NotificationPayload, userId: string) {
        const url = this.configService.get<string>('NOTIFICATION_URL');

        if (!payload.token) {
            this.logger.warn('Token de notification manquant. Envoi annulé.');
            return { status: false, message: 'Token manquant' };
        }

        const refId = payload.data?.ref_id || null;

        const notificationDoc = new this.notificationModel({
            type: payload.data.type,
            message: payload.body,
            user_id: userId,
            ref_id: refId,
        });

        await notificationDoc.save();

        try {
            this.logger.log(`Envoi de la notification à ${url} avec type: ${payload.data.type}`);
            const response = await firstValueFrom(this.httpService.post(url, payload));

            this.logger.log(
                `Notification envoyée avec succès: ${JSON.stringify(response.data, null, 2)}`,
            );

            return {
                status: response.status === 200,
                message: 'Succès',
            };
        } catch (error) {
            this.logger.error(
                `Erreur d'envoi: ${error?.message || error}. Payload: ${JSON.stringify(payload)}`,
            );
            return {
                status: false,
                message: "Erreur lors de l'envoi de la notification.",
            };
        }
    }

    async sendPredefinedNotification(
        user: User,
        type: NotificationType,
        extraData: Record<string, any> = {},
        overrideMessage?: string,
    ) {
        if (!user?.firebaseNotificationToken) {
            this.logger.warn(`Utilisateur sans token de notification. Type: ${type}`);
            return { status: false, message: 'Utilisateur sans token' };
        }

        const notification = this.prepareNotification(
            type,
            user.firebaseNotificationToken,
            extraData,
            overrideMessage,
        );
        await this.emailService.sendEmail(user.email, notification.title, notification.body);

        return this.sendNotification(notification, user._id.toString());
    }

    // Méthodes simplifiées

    async sendWelcome(user: User) {
        return this.sendPredefinedNotification(user, NotificationType.WELCOME);
    }

    async sendGeneral(user: User, message: string) {
        return this.sendPredefinedNotification(user, NotificationType.GENERAL, {}, message);
    }

    async sendInformation(user: User, message: string) {
        return this.sendPredefinedNotification(user, NotificationType.INFORMATION, {}, message);
    }

    async sendNewRdv(user: User, rdvId: string) {
        return this.sendPredefinedNotification(user, NotificationType.NEW_RDV, { ref_id: rdvId });
    }

    async sendRdvAccepted(user: User, rdvId: string) {
        return this.sendPredefinedNotification(user, NotificationType.RDV_ACCEPTED, {
            ref_id: rdvId,
        });
    }

    async sendRdvRefused(user: User, rdvId: string) {
        return this.sendPredefinedNotification(user, NotificationType.RDV_REFUSED, {
            ref_id: rdvId,
        });
    }

    async sendNewFeature(user: User) {
        return this.sendPredefinedNotification(user, NotificationType.NEW_FEATURE);
    }

    async sendBestConsultants(user: User) {
        return this.sendPredefinedNotification(user, NotificationType.BEST_CONSULTANTS);
    }
}
