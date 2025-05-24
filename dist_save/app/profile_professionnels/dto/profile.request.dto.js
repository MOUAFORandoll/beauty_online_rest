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
exports.FindByServiceDto = exports.UpdateProfileDto = exports.CreateProfileDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const entities_1 = require("../../../databases/users/entities");
class CreateProfileDto {
}
exports.CreateProfileDto = CreateProfileDto;
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateProfileDto.prototype, "namePro", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ enum: entities_1.ServiceType, example: entities_1.ServiceType.COIFFURE }),
    (0, class_validator_1.IsEnum)(entities_1.ServiceType, {
        message: 'Service must be one of the predefined values: COIFFURE, MANICURE',
    }),
    __metadata("design:type", String)
], CreateProfileDto.prototype, "service", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateProfileDto.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: String, required: false }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateProfileDto.prototype, "longitude", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: String, required: false }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateProfileDto.prototype, "latitude", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateProfileDto.prototype, "titleEmplacement", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: String,
        format: 'binary',
        required: false,
        description: 'Couverture Pro',
    }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Object)
], CreateProfileDto.prototype, "cover", void 0);
class UpdateProfileDto {
}
exports.UpdateProfileDto = UpdateProfileDto;
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateProfileDto.prototype, "name_pro", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateProfileDto.prototype, "description", void 0);
class FindByServiceDto {
}
exports.FindByServiceDto = FindByServiceDto;
__decorate([
    (0, swagger_1.ApiProperty)({ enum: entities_1.ServiceType, example: entities_1.ServiceType.COIFFURE }),
    (0, class_validator_1.IsEnum)(entities_1.ServiceType, {
        message: 'Service must be one of the predefined values: COIFFURE, MANICURE',
    }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], FindByServiceDto.prototype, "service", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], FindByServiceDto.prototype, "namePro", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], FindByServiceDto.prototype, "description", void 0);
//# sourceMappingURL=profile.request.dto.js.map