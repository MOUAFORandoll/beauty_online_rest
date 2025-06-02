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
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotificationsController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const dto_1 = require("../dto");
const api_decorators_1 = require("../../../common/apiutils/api.decorators");
const notifications_service_1 = require("../providers/notifications.service");
const decorators_1 = require("../decorators");
const apiutils_1 = require("../../../common/apiutils");
const main_database_connection_1 = require("../../../databases/main.database.connection");
const mongoose_1 = require("@nestjs/mongoose");
const config_1 = require("@nestjs/config");
let NotificationsController = class NotificationsController {
    constructor(notificationsService, userModel, agendaModel, realisationModel, realisationFileModel, realisationVideoModel, creneauModel, profileModel, positionModel, rendezVousModel, configService) {
        this.notificationsService = notificationsService;
        this.userModel = userModel;
        this.agendaModel = agendaModel;
        this.realisationModel = realisationModel;
        this.realisationFileModel = realisationFileModel;
        this.realisationVideoModel = realisationVideoModel;
        this.creneauModel = creneauModel;
        this.profileModel = profileModel;
        this.positionModel = positionModel;
        this.rendezVousModel = rendezVousModel;
        this.configService = configService;
    }
    async sendWelcomeNotification(userId) {
        await this.notificationsService.welComeNotification(userId);
    }
    async sendGeneralNotification(body) {
        await this.notificationsService.generaleNotification(body.message);
    }
    async sendNotificationToUser(body) {
        await this.notificationsService.sendNotiftoUser(body.userId, body.message);
    }
    async findUserNotification(userId, pagination) {
        const { data, total } = await this.notificationsService.findUserNotification(userId, pagination);
        return apiutils_1.PaginationResponseDto.responseDto(pagination, data, total).mapPromise((l) => dto_1.NotificationResponseDto.fromNotification(l, {
            rendezVousModel: this.rendezVousModel,
            userModel: this.userModel,
            agendaModel: this.agendaModel,
            realisationModel: this.realisationModel,
            realisationFileModel: this.realisationFileModel,
            realisationVideoModel: this.realisationVideoModel,
            creneauModel: this.creneauModel,
            profileModel: this.profileModel,
            positionModel: this.positionModel,
            configService: this.configService,
        }));
    }
};
exports.NotificationsController = NotificationsController;
__decorate([
    (0, common_1.Get)('/welcome'),
    (0, api_decorators_1.Public)(),
    (0, swagger_1.ApiOperation)({
        summary: 'Sends a welcome notification to a user by their ID',
    }),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, common_1.Query)('userId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], NotificationsController.prototype, "sendWelcomeNotification", null);
__decorate([
    (0, common_1.Post)('/generale'),
    (0, api_decorators_1.Public)(),
    (0, swagger_1.ApiOperation)({
        summary: 'Sends a general notification to all users',
    }),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.GeneralNotificationDto]),
    __metadata("design:returntype", Promise)
], NotificationsController.prototype, "sendGeneralNotification", null);
__decorate([
    (0, common_1.Post)('/user'),
    (0, swagger_1.ApiOperation)({
        summary: 'Sends a notification to a specific user by their ID',
    }),
    (0, api_decorators_1.Public)(),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.ParticularNotificationDto]),
    __metadata("design:returntype", Promise)
], NotificationsController.prototype, "sendNotificationToUser", null);
__decorate([
    (0, common_1.Get)('/me'),
    (0, swagger_1.ApiOperation)({
        summary: 'Retrieves a user by their  token',
    }),
    (0, swagger_1.ApiOkResponse)({ type: dto_1.NotificationResponseDto }),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, decorators_1.GetUser)('id')),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, apiutils_1.PaginationPayloadDto]),
    __metadata("design:returntype", Promise)
], NotificationsController.prototype, "findUserNotification", null);
exports.NotificationsController = NotificationsController = __decorate([
    (0, common_1.Controller)('notifications'),
    __param(1, (0, mongoose_1.InjectModel)(main_database_connection_1.USER_MODEL_NAME, main_database_connection_1.DATABASE_CONNECTION)),
    __param(2, (0, mongoose_1.InjectModel)(main_database_connection_1.AGENDA_MODEL_NAME, main_database_connection_1.DATABASE_CONNECTION)),
    __param(3, (0, mongoose_1.InjectModel)(main_database_connection_1.REALISATION_MODEL_NAME, main_database_connection_1.DATABASE_CONNECTION)),
    __param(4, (0, mongoose_1.InjectModel)(main_database_connection_1.REALISATION_FILE_MODEL_NAME, main_database_connection_1.DATABASE_CONNECTION)),
    __param(5, (0, mongoose_1.InjectModel)(main_database_connection_1.REALISATION_VIDEO_MODEL_NAME, main_database_connection_1.DATABASE_CONNECTION)),
    __param(6, (0, mongoose_1.InjectModel)(main_database_connection_1.CRENEAU_MODEL_NAME, main_database_connection_1.DATABASE_CONNECTION)),
    __param(7, (0, mongoose_1.InjectModel)(main_database_connection_1.PROFILE_PRO_MODEL_NAME, main_database_connection_1.DATABASE_CONNECTION)),
    __param(8, (0, mongoose_1.InjectModel)(main_database_connection_1.POSITION_MODEL_NAME, main_database_connection_1.DATABASE_CONNECTION)),
    __param(9, (0, mongoose_1.InjectModel)(main_database_connection_1.RENDEZ_VOUS_MODEL_NAME, main_database_connection_1.DATABASE_CONNECTION)),
    __metadata("design:paramtypes", [notifications_service_1.NotificationsService, Object, Object, Object, Object, Object, Object, Object, Object, Object, config_1.ConfigService])
], NotificationsController);
//# sourceMappingURL=notifications.controller.js.map