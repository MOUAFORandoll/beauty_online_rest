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
var SendNotificationsService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.SendNotificationsService = void 0;
const common_1 = require("@nestjs/common");
const axios_1 = require("@nestjs/axios");
const rxjs_1 = require("rxjs");
const config_1 = require("@nestjs/config");
let SendNotificationsService = SendNotificationsService_1 = class SendNotificationsService {
    constructor(httpService, configService) {
        this.httpService = httpService;
        this.configService = configService;
        this.logger = new common_1.Logger(SendNotificationsService_1.name);
        this.NOTIFICATION_TYPES = {
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
        };
    }
    prepareNotification(type, token, extraData = {}) {
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
    async sendNotification(payload) {
        const url = this.configService.get('NOTIFICATION_URL');
        this.logger.log(`Envoi de notification à l'URL: ${url}`);
        try {
            const response = await (0, rxjs_1.firstValueFrom)(this.httpService.post(url, payload));
            this.logger.log(`Notification envoyée: ${JSON.stringify(response.data)}`);
            return {
                message: response.status === 200 ? 'Success' : "Erreur lors de l'envoi",
                status: response.status === 200,
            };
        }
        catch (error) {
            this.logger.error(`Erreur d'envoi de notification: ${error.message}`);
            return {
                status: false,
                message: "Une erreur s'est produite lors de l'envoi de la notification.",
            };
        }
    }
    async sendGeneralNotification(user) {
        const notification = this.prepareNotification('GENERAL', user.firebaseNotificationToken);
        return this.sendNotification(notification);
    }
    async sendNewRdvNotification(user, rdvId) {
        const notification = this.prepareNotification('NEW_RDV', user.firebaseNotificationToken, {
            rdvId,
        });
        return this.sendNotification(notification);
    }
    async sendRdvAcceptedNotification(user, rdvId) {
        const notification = this.prepareNotification('RDV_ACCEPTED', user.firebaseNotificationToken, { rdvId });
        return this.sendNotification(notification);
    }
    async sendRdvRefusedNotification(user, rdvId) {
        const notification = this.prepareNotification('RDV_REFUSED', user.firebaseNotificationToken, { rdvId });
        return this.sendNotification(notification);
    }
    async sendNewFeatureNotification(user) {
        const notification = this.prepareNotification('NEW_FEATURE', user.firebaseNotificationToken);
        return this.sendNotification(notification);
    }
    async sendBestConsultantsNotification(user) {
        const notification = this.prepareNotification('BEST_CONSULTANTS', user.firebaseNotificationToken);
        return this.sendNotification(notification);
    }
};
exports.SendNotificationsService = SendNotificationsService;
exports.SendNotificationsService = SendNotificationsService = SendNotificationsService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [axios_1.HttpService,
        config_1.ConfigService])
], SendNotificationsService);
//# sourceMappingURL=send_notifications.service.js.map