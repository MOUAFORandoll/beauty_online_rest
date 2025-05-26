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
exports.ParticularNotificationDto = exports.GeneralNotificationDto = void 0;
const class_validator_1 = require("class-validator");
const swagger_1 = require("@nestjs/swagger");
class GeneralNotificationDto {
}
exports.GeneralNotificationDto = GeneralNotificationDto;
__decorate([
    (0, swagger_1.ApiProperty)({ type: String, required: true }),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], GeneralNotificationDto.prototype, "message", void 0);
class ParticularNotificationDto {
}
exports.ParticularNotificationDto = ParticularNotificationDto;
__decorate([
    (0, swagger_1.ApiProperty)({ type: String, required: true }),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], ParticularNotificationDto.prototype, "userId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: String, required: true }),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], ParticularNotificationDto.prototype, "message", void 0);
//# sourceMappingURL=notifications.request.dto.js.map