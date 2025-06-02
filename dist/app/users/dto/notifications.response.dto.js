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
exports.NotificationResponseDto = void 0;
const class_validator_1 = require("class-validator");
const swagger_1 = require("@nestjs/swagger");
const notifications_schema_1 = require("../../../databases/users/entities/notifications.schema");
const dto_1 = require("../../rendez_vous/dto");
class NotificationResponseDto {
    static async fromNotification(notification, deps) {
        const typesRequérantChargementRdv = [
            notifications_schema_1.NotificationType.NEW_RDV,
            notifications_schema_1.NotificationType.RDV_ACCEPTED,
            notifications_schema_1.NotificationType.RDV_REFUSED,
        ];
        if (typesRequérantChargementRdv.includes(notification.type)) {
            if (!deps) {
                throw new Error('Les dépendances nécessaires pour charger les données RDV ne sont pas fournies.');
            }
            return this.fromNotificationRendezVous(notification, deps);
        }
        return this.fromNotificationBodyEmpty(notification);
    }
    static fromNotificationBodyEmpty(notification) {
        return {
            id: notification._id.toString(),
            type: notification.type,
            message: notification.message,
            data: {},
        };
    }
    static async fromNotificationRendezVous(notification, deps) {
        const { rendezVousModel, ...models } = deps;
        const rendezVous = await rendezVousModel.findById(notification.ref_id).exec();
        if (!rendezVous) {
            throw new Error(`Rendez-vous introuvable pour l'ID: ${notification.ref_id}`);
        }
        const data = await dto_1.RendezVousResponseDto.fromRendezVous(models.userModel, models.agendaModel, models.realisationModel, models.realisationFileModel, models.realisationVideoModel, models.creneauModel, models.profileModel, rendezVousModel, models.positionModel, rendezVous, deps.configService);
        return {
            id: notification._id.toString(),
            type: notification.type,
            message: notification.message,
            data,
        };
    }
}
exports.NotificationResponseDto = NotificationResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({ type: String, required: true }),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], NotificationResponseDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ enum: notifications_schema_1.NotificationType, required: true }),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], NotificationResponseDto.prototype, "type", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: String, required: true }),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], NotificationResponseDto.prototype, "message", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Object)
], NotificationResponseDto.prototype, "data", void 0);
//# sourceMappingURL=notifications.response.dto.js.map