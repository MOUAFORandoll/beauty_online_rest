"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
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
const Database = __importStar(require("../../../databases/users/providers"));
const providers_1 = require("../../../common/modules/notifications/providers");
const api_decorators_1 = require("../../../common/apiutils/api.decorators");
const notifications_service_1 = require("../providers/notifications.service");
let NotificationsController = class NotificationsController {
    constructor(notificationsService, dbUsersService, sendNotificationsService) {
        this.notificationsService = notificationsService;
        this.dbUsersService = dbUsersService;
        this.sendNotificationsService = sendNotificationsService;
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
exports.NotificationsController = NotificationsController = __decorate([
    (0, common_1.Controller)('notifications'),
    __metadata("design:paramtypes", [notifications_service_1.NotificationsService, Database.UsersService, providers_1.SendNotificationsService])
], NotificationsController);
//# sourceMappingURL=notifications.controller.js.map