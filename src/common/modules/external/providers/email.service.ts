// email.service.ts
import { Injectable, Logger } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class EmailService {
    private readonly logger = new Logger(EmailService.name);

    constructor(
        private readonly mailerService: MailerService,
        private readonly configService: ConfigService,
    ) {}

    async sendEmail(to: string, subject: string, htmlBody: string): Promise<boolean> {
        try {
            await this.mailerService.sendMail({
                to,
                subject,
                html: this.wrapHtmlBody(htmlBody),
            });

            this.logger.log(`Email envoyé à ${to}`);
            return true;
        } catch (error) {
            this.logger.error(`Erreur d'envoi d'email à ${to}: ${error.message}`);
            return false;
        }
    }
    wrapHtmlBody(htmlBody: string): string {
        const url = this.configService.get<string>('NOTIFICATION_URL');

        return `
    <!DOCTYPE html>
    <html lang="fr">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Email Beauty</title>
    </head>
    <body style="font-family: Arial, sans-serif; background-color: #f5f5f5; padding: 20px;">
      <table align="center" width="100%" style="max-width: 600px; background-color: white; padding: 30px; border-radius: 8px; box-shadow: 0 0 10px rgba(0,0,0,0.05);">
        <tr>
          <td align="center" style="padding-bottom: 20px;">
            <img src="https://dash.beauty.petite-monnaie.com/assets/logo.60e43cef.png" alt="Logo Beauty" style="max-height: 60px;">
          </td>
        </tr>
        <tr>
          <td style="padding-bottom: 20px;">
            <h2 style="color: #333;">Bonjour 👋</h2>
          </td>
        </tr>
        <tr>
          <td style="color: #555; font-size: 16px; line-height: 1.5;">
            ${htmlBody}
          </td>
        </tr>
        <tr>
          <td style="padding-top: 30px; color: #999; font-size: 12px;" align="center">
            &copy; ${new Date().getFullYear()} Beauty. Tous droits réservés.
          </td>
        </tr>
      </table>
    </body>
    </html>
  `;
    }
}
