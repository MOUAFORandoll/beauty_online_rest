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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var SendNotificationsService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.SendNotificationsService = exports.NotificationTypeDetails = void 0;
const common_1 = require("@nestjs/common");
const axios_1 = require("@nestjs/axios");
const config_1 = require("@nestjs/config");
const rxjs_1 = require("rxjs");
const notifications_schema_1 = require("../../../../databases/users/entities/notifications.schema");
const main_database_connection_1 = require("../../../../databases/main.database.connection");
const mongoose_1 = require("@nestjs/mongoose");
const providers_1 = require("../../external/providers");
exports.NotificationTypeDetails = {
    [notifications_schema_1.NotificationType.WELCOME]: {
        title: 'Bienvenue sur Beauty',
        message: "Hey, bienvenue sur l'application Beauty en ligne !",
    },
    [notifications_schema_1.NotificationType.GENERAL]: {
        title: 'Général',
        message: '',
    },
    [notifications_schema_1.NotificationType.INFORMATION]: {
        title: 'Informations',
        message: '',
    },
    [notifications_schema_1.NotificationType.NEW_RDV]: {
        title: 'Nouveau rendez-vous',
        message: 'Un nouveau rendez-vous a été planifié sur votre agenda.',
    },
    [notifications_schema_1.NotificationType.RDV_ACCEPTED]: {
        title: 'Rendez-vous accepté',
        message: 'Votre rendez-vous a été accepté avec succès.',
    },
    [notifications_schema_1.NotificationType.RDV_REFUSED]: {
        title: 'Rendez-vous refusé',
        message: 'Votre rendez-vous a été refusé. Veuillez en choisir un autre.',
    },
    [notifications_schema_1.NotificationType.NEW_FEATURE]: {
        title: 'Nouveauté !',
        message: 'Découvrez les nouvelles fonctionnalités de Beauty !',
    },
    [notifications_schema_1.NotificationType.BEST_CONSULTANTS]: {
        title: 'Top Prestataires',
        message: 'Découvrez les prestataires les mieux notés du moment !',
    },
};
let SendNotificationsService = SendNotificationsService_1 = class SendNotificationsService {
    constructor(notificationModel, httpService, configService, emailService) {
        this.notificationModel = notificationModel;
        this.httpService = httpService;
        this.configService = configService;
        this.emailService = emailService;
        this.logger = new common_1.Logger(SendNotificationsService_1.name);
    }
    prepareNotification(type, token, extraData = {}, overrideMessage) {
        const notif = exports.NotificationTypeDetails[type];
        if (!notif) {
            throw new Error(`Type de notification inconnu : ${type}`);
        }
        return {
            token,
            title: notif.title,
            body: overrideMessage || notif.message,
            data: {
                type,
                ...extraData,
            },
        };
    }
    async sendNotification(payload, userId) {
        const url = this.configService.get('NOTIFICATION_URL');
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
            const response = await (0, rxjs_1.firstValueFrom)(this.httpService.post(url, payload));
            this.logger.log(`Notification envoyée avec succès: ${JSON.stringify(response.data, null, 2)}`);
            return {
                status: response.status === 200,
                message: 'Succès',
            };
        }
        catch (error) {
            this.logger.error(`Erreur d'envoi: ${error?.message || error}. Payload: ${JSON.stringify(payload)}`);
            return {
                status: false,
                message: "Erreur lors de l'envoi de la notification.",
            };
        }
    }
    async sendPredefinedNotification(user, type, extraData = {}, overrideMessage) {
        if (!user?.firebaseNotificationToken) {
            this.logger.warn(`Utilisateur sans token de notification. Type: ${type}`);
            return { status: false, message: 'Utilisateur sans token' };
        }
        const notification = this.prepareNotification(type, user.firebaseNotificationToken, extraData, overrideMessage);
        await this.emailService.sendEmail(user.email, notification.title, notification.body);
        return this.sendNotification(notification, user._id.toString());
    }
    async sendWelcome(user) {
        return this.sendPredefinedNotification(user, notifications_schema_1.NotificationType.WELCOME);
    }
    async sendGeneral(user, message) {
        return this.sendPredefinedNotification(user, notifications_schema_1.NotificationType.GENERAL, {}, message);
    }
    async sendInformation(user, message) {
        return this.sendPredefinedNotification(user, notifications_schema_1.NotificationType.INFORMATION, {}, message);
    }
    async sendNewRdv(user, rdvId) {
        return this.sendPredefinedNotification(user, notifications_schema_1.NotificationType.NEW_RDV, { ref_id: rdvId });
    }
    async sendRdvAccepted(user, rdvId) {
        return this.sendPredefinedNotification(user, notifications_schema_1.NotificationType.RDV_ACCEPTED, {
            ref_id: rdvId,
        });
    }
    async sendRdvRefused(user, rdvId) {
        return this.sendPredefinedNotification(user, notifications_schema_1.NotificationType.RDV_REFUSED, {
            ref_id: rdvId,
        });
    }
    async sendNewFeature(user) {
        return this.sendPredefinedNotification(user, notifications_schema_1.NotificationType.NEW_FEATURE);
    }
    async sendBestConsultants(user) {
        return this.sendPredefinedNotification(user, notifications_schema_1.NotificationType.BEST_CONSULTANTS);
    }
};
exports.SendNotificationsService = SendNotificationsService;
exports.SendNotificationsService = SendNotificationsService = SendNotificationsService_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(notifications_schema_1.NOTIFICATION_MODEL_NAME, main_database_connection_1.DATABASE_CONNECTION)),
    __metadata("design:paramtypes", [Object, axios_1.HttpService,
        config_1.ConfigService,
        providers_1.EmailService])
], SendNotificationsService);
//# sourceMappingURL=send_notifications.service.js.map