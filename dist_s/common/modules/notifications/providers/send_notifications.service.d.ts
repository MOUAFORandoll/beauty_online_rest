import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { NotificationModel, NotificationType } from 'src/databases/users/entities/notifications.schema';
import { User } from 'src/databases/main.database.connection';
import { EmailService } from 'src/common/modules/external/providers';
export declare const NotificationTypeDetails: {
    readonly welcome: {
        readonly title: "Bienvenue sur Beauty";
        readonly message: "Hey, bienvenue sur l'application Beauty en ligne !";
    };
    readonly generale: {
        readonly title: "Général";
        readonly message: "";
    };
    readonly information: {
        readonly title: "Informations";
        readonly message: "";
    };
    readonly new_rdv: {
        readonly title: "Nouveau rendez-vous";
        readonly message: "Un nouveau rendez-vous a été planifié sur votre agenda.";
    };
    readonly rdv_accepted: {
        readonly title: "Rendez-vous accepté";
        readonly message: "Votre rendez-vous a été accepté avec succès.";
    };
    readonly rdv_refused: {
        readonly title: "Rendez-vous refusé";
        readonly message: "Votre rendez-vous a été refusé. Veuillez en choisir un autre.";
    };
    readonly new_feature: {
        readonly title: "Nouveauté !";
        readonly message: "Découvrez les nouvelles fonctionnalités de Beauty !";
    };
    readonly best_consultants: {
        readonly title: "Top Prestataires";
        readonly message: "Découvrez les prestataires les mieux notés du moment !";
    };
};
export declare class SendNotificationsService {
    private readonly notificationModel;
    private readonly httpService;
    private readonly configService;
    private readonly emailService;
    private readonly logger;
    constructor(notificationModel: NotificationModel, httpService: HttpService, configService: ConfigService, emailService: EmailService);
    private prepareNotification;
    private sendNotification;
    sendPredefinedNotification(user: User, type: NotificationType, extraData?: Record<string, any>, overrideMessage?: string): Promise<{
        status: boolean;
        message: string;
    }>;
    sendWelcome(user: User): Promise<{
        status: boolean;
        message: string;
    }>;
    sendGeneral(user: User, message: string): Promise<{
        status: boolean;
        message: string;
    }>;
    sendInformation(user: User, message: string): Promise<{
        status: boolean;
        message: string;
    }>;
    sendNewRdv(user: User, rdvId: string): Promise<{
        status: boolean;
        message: string;
    }>;
    sendRdvAccepted(user: User, rdvId: string): Promise<{
        status: boolean;
        message: string;
    }>;
    sendRdvRefused(user: User, rdvId: string): Promise<{
        status: boolean;
        message: string;
    }>;
    sendNewFeature(user: User): Promise<{
        status: boolean;
        message: string;
    }>;
    sendBestConsultants(user: User): Promise<{
        status: boolean;
        message: string;
    }>;
}
