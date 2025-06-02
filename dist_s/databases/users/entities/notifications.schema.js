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
exports.NotificationsSchema = exports.NotificationSchema = exports.NOTIFICATION_MODEL_NAME = exports.NotificationType = void 0;
const swagger_1 = require("@nestjs/swagger");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const base_schema_1 = require("../../base.schema");
const base_functions_1 = require("../../base.functions");
const users_schema_1 = require("./users.schema");
var NotificationType;
(function (NotificationType) {
    NotificationType["WELCOME"] = "welcome";
    NotificationType["GENERAL"] = "generale";
    NotificationType["INFORMATION"] = "information";
    NotificationType["NEW_RDV"] = "new_rdv";
    NotificationType["RDV_ACCEPTED"] = "rdv_accepted";
    NotificationType["RDV_REFUSED"] = "rdv_refused";
    NotificationType["NEW_FEATURE"] = "new_feature";
    NotificationType["BEST_CONSULTANTS"] = "best_consultants";
})(NotificationType || (exports.NotificationType = NotificationType = {}));
exports.NOTIFICATION_MODEL_NAME = 'notifications';
let NotificationSchema = class NotificationSchema extends base_schema_1.BaseSchema {
};
exports.NotificationSchema = NotificationSchema;
__decorate([
    (0, swagger_1.ApiProperty)({ enum: NotificationType }),
    (0, mongoose_1.Prop)({ type: String, enum: NotificationType, required: true }),
    __metadata("design:type", String)
], NotificationSchema.prototype, "type", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], NotificationSchema.prototype, "message", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: mongoose_2.Schema.Types.ObjectId }),
    (0, mongoose_1.Prop)({ type: mongoose_2.Schema.Types.ObjectId, ref: users_schema_1.USER_MODEL_NAME }),
    __metadata("design:type", String)
], NotificationSchema.prototype, "user_id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: String, description: 'Référence liée à la notification (ex: ID de RDV)' }),
    (0, mongoose_1.Prop)({ type: mongoose_2.Schema.Types.ObjectId, required: false }),
    __metadata("design:type", String)
], NotificationSchema.prototype, "ref_id", void 0);
exports.NotificationSchema = NotificationSchema = __decorate([
    (0, mongoose_1.Schema)({ collection: exports.NOTIFICATION_MODEL_NAME })
], NotificationSchema);
exports.NotificationsSchema = (0, base_functions_1.applySortedMongooseAdditionalFunctions)(mongoose_1.SchemaFactory.createForClass(NotificationSchema));
//# sourceMappingURL=notifications.schema.js.map