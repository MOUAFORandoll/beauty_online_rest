import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
export declare class SendNotificationsService {
    private readonly httpService;
    private readonly configService;
    private readonly logger;
    private readonly NOTIFICATION_TYPES;
    constructor(httpService: HttpService, configService: ConfigService);
    private prepareNotification;
    private sendNotification;
    sendGeneralNotification(user: any): Promise<{
        message: string;
        status: boolean;
    }>;
    sendNewRdvNotification(user: any, rdvId: string): Promise<{
        message: string;
        status: boolean;
    }>;
    sendRdvAcceptedNotification(user: any, rdvId: string): Promise<{
        message: string;
        status: boolean;
    }>;
    sendRdvRefusedNotification(user: any, rdvId: string): Promise<{
        message: string;
        status: boolean;
    }>;
    sendNewFeatureNotification(user: any): Promise<{
        message: string;
        status: boolean;
    }>;
    sendBestConsultantsNotification(user: any): Promise<{
        message: string;
        status: boolean;
    }>;
}
