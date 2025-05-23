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
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmailService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const client_ses_1 = require("@aws-sdk/client-ses");
let EmailService = class EmailService {
    constructor(configService) {
        this.configService = configService;
        this.sesClient = new client_ses_1.SESClient({
            credentials: {
                accessKeyId: this.configService.get('AWS_ACCESS_KEY_ID'),
                secretAccessKey: this.configService.get('AWS_ACCESS_KEY_SECRET')
            },
            region: this.configService.get('AWS_REGION'),
        });
        this.senderEmail = this.configService.get('AWS_SES_SENDER_EMAIL');
        this.senderName = this.configService.get('AWS_SES_SENDER_NAME');
    }
    async sendSingleMail(recipient, subject, content) {
        await this.sesClient.send(new client_ses_1.SendEmailCommand({
            Destination: { ToAddresses: [recipient] },
            Message: {
                Body: {
                    Html: {
                        Data: content
                    },
                },
                Subject: { Data: subject },
            },
            Source: `${this.senderName} <${this.senderEmail}>`,
        }));
    }
    async sendBulkMails(recipients, subject, content) {
        for (const recipient of recipients) {
            try {
                await this.sendSingleMail(recipient, subject, content);
                await this.delay(500);
            }
            catch { }
        }
    }
    delay(ms) {
        return new Promise((resolve) => setTimeout(resolve, ms));
    }
};
exports.EmailService = EmailService;
exports.EmailService = EmailService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], EmailService);
//# sourceMappingURL=email.service.js.map