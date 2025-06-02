import { MailerService } from '@nestjs-modules/mailer';
import { ConfigService } from '@nestjs/config';
export declare class EmailService {
    private readonly mailerService;
    private readonly configService;
    private readonly logger;
    constructor(mailerService: MailerService, configService: ConfigService);
    sendEmail(to: string, subject: string, htmlBody: string): Promise<boolean>;
    wrapHtmlBody(htmlBody: string): string;
}
