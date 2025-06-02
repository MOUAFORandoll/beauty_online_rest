"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var EmailService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmailService = void 0;
const common_1 = require("@nestjs/common");
const mailer_1 = require("@nestjs-modules/mailer");
const config_1 = require("@nestjs/config");
let EmailService = EmailService_1 = class EmailService {
    constructor(mailerService, configService) {
        this.mailerService = mailerService;
        this.configService = configService;
        this.logger = new common_1.Logger(EmailService_1.name);
    }
    async sendEmail(to, subject, htmlBody) {
        try {
            await this.mailerService.sendMail({
                to,
                subject,
                html: this.wrapHtmlBody(htmlBody),
            });
            this.logger.log(`Email envoyé à ${to}`);
            return true;
        }
        catch (error) {
            this.logger.error(`Erreur d'envoi d'email à ${to}: ${error.message}`);
            return false;
        }
    }
    wrapHtmlBody(htmlBody) {
        const url = this.configService.get('NOTIFICATION_URL');
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
};
exports.EmailService = EmailService;
exports.EmailService = EmailService = EmailService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [mailer_1.MailerService,
        config_1.ConfigService])
], EmailService);
//# sourceMappingURL=email.service.js.map