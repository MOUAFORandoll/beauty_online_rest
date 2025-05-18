import { Injectable, Logger } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { ConfigService } from '@nestjs/config';

interface NotificationPayload {
    token: string;
    title: string;
    body: string;
    data: Record<string, any>;
}

@Injectable()
export class SendNotificationsService {
    private readonly logger = new Logger(SendNotificationsService.name);

    private readonly NOTIFICATION_TYPES = {
        GENERAL: {
            type: 'general',
            title: 'Bienvenue sur Beauty',
            message: "Hey, bienvenue sur l'application Beauty en ligne !",
        },
        NEW_RDV: {
            type: 'new_rdv',
            title: 'Nouveau rendez-vous',
            message: 'Un nouveau rendez-vous a été planifié sur votre agenda.',
        },
        RDV_ACCEPTED: {
            type: 'rdv_accepted',
            title: 'Rendez-vous accepté',
            message: 'Votre rendez-vous a été accepté avec succès.',
        },

        RDV_REFUSED: {
            type: 'rdv_refused',
            title: 'Rendez-vous refusé',
            message: 'Votre rendez-vous a été refusé. Veuillez en choisir un autre.',
        },
        NEW_FEATURE: {
            type: 'new_feature',
            title: 'Nouveauté !',
            message: 'Découvrez les nouvelles fonctionnalités de Beauty !',
        },
        BEST_CONSULTANTS: {
            type: 'best_consultants',
            title: 'Top Prestataires',
            message: 'Découvrez les prestataires les mieux notés du moment !',
        },
    } as const;

    constructor(
        private readonly httpService: HttpService,
        private readonly configService: ConfigService,
    ) {}

    private prepareNotification(
        type: keyof typeof this.NOTIFICATION_TYPES,
        token: string,
        extraData: Record<string, any> = {},
    ): NotificationPayload {
        const notif = this.NOTIFICATION_TYPES[type];
        return {
            token,
            title: notif.title,
            body: notif.message,
            data: {
                type: notif.type,
                ...extraData,
            },
        };
    }

    private async sendNotification(payload: NotificationPayload) {
        const url = this.configService.get<string>('NOTIFICATION_URL');
        this.logger.log(`Envoi de notification à l'URL: ${url}`);

        try {
            const response = await firstValueFrom(this.httpService.post(url, payload));

            this.logger.log(`Notification envoyée: ${JSON.stringify(response.data)}`);

            return {
                message: response.status === 200 ? 'Success' : "Erreur lors de l'envoi",
                status: response.status === 200,
            };
        } catch (error) {
            this.logger.error(`Erreur d'envoi de notification: ${error.message}`);
            return {
                status: false,
                message: "Une erreur s'est produite lors de l'envoi de la notification.",
            };
        }
    }

    async sendGeneralNotification(user: any) {
        const notification = this.prepareNotification('GENERAL', user.firebaseNotificationToken);
        return this.sendNotification(notification);
    }

    async sendNewRdvNotification(user: any, rdvId: string) {
        const notification = this.prepareNotification('NEW_RDV', user.firebaseNotificationToken, {
            rdvId,
        });
        return this.sendNotification(notification);
    }

    async sendRdvAcceptedNotification(user: any, rdvId: string) {
        const notification = this.prepareNotification(
            'RDV_ACCEPTED',
            user.firebaseNotificationToken,
            { rdvId },
        );
        return this.sendNotification(notification);
    }

    async sendRdvRefusedNotification(user: any, rdvId: string) {
        const notification = this.prepareNotification(
            'RDV_REFUSED',
            user.firebaseNotificationToken,
            { rdvId },
        );
        return this.sendNotification(notification);
    }

    async sendNewFeatureNotification(user: any) {
        const notification = this.prepareNotification(
            'NEW_FEATURE',
            user.firebaseNotificationToken,
        );
        return this.sendNotification(notification);
    }

    async sendBestConsultantsNotification(user: any) {
        const notification = this.prepareNotification(
            'BEST_CONSULTANTS',
            user.firebaseNotificationToken,
        );
        return this.sendNotification(notification);
    }
}
