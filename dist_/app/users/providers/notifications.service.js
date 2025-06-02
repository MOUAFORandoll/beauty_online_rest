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
exports.NotificationsService = void 0;
const common_1 = require("@nestjs/common");
const Database = __importStar(require("../../../databases/users/providers"));
const providers_1 = require("../../../common/modules/notifications/providers");
const notifications_schema_1 = require("../../../databases/users/entities/notifications.schema");
const mongoose_1 = require("@nestjs/mongoose");
const main_database_connection_1 = require("../../../databases/main.database.connection");
let NotificationsService = class NotificationsService {
    constructor(notificationModel, usersService, sendNotificationsService) {
        this.notificationModel = notificationModel;
        this.usersService = usersService;
        this.sendNotificationsService = sendNotificationsService;
    }
    async welComeNotification(id) {
        const user = await this.usersService.getUser(id);
        await this.sendNotificationsService.sendWelcome(user);
    }
    async generaleNotification(message) {
        const users = await this.usersService.getAllUsers();
        for (const user of users) {
            await this.sendNotificationsService.sendGeneral(user, message);
        }
    }
    async sendNotiftoUser(id, message) {
        const user = await this.usersService.getUser(id);
        await this.sendNotificationsService.sendInformation(user, message);
    }
    async findUserNotification(idUser, pagination) {
        const [data, total] = await Promise.all([
            this.notificationModel
                .find({ user_id: idUser })
                .sort({ createdAt: -1 })
                .skip((pagination.page - 1) * pagination.size)
                .limit(pagination.size)
                .exec(),
            this.notificationModel.countDocuments({ user_id: idUser }).exec(),
        ]);
        return { data, total };
    }
};
exports.NotificationsService = NotificationsService;
exports.NotificationsService = NotificationsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(notifications_schema_1.NOTIFICATION_MODEL_NAME, main_database_connection_1.DATABASE_CONNECTION)),
    __metadata("design:paramtypes", [Object, Database.UsersService, providers_1.SendNotificationsService])
], NotificationsService);
//# sourceMappingURL=notifications.service.js.map