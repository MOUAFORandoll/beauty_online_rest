import { ConfigService } from '@nestjs/config';
export declare class EmailService {
    private readonly configService;
    private readonly sesClient;
    private readonly senderEmail;
    private readonly senderName;
    constructor(configService: ConfigService);
    sendSingleMail(recipient: string, subject: string, content: string): Promise<void>;
    sendBulkMails(recipients: string[], subject: string, content: string): Promise<void>;
    private delay;
}
