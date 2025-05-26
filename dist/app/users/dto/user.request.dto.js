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
exports.FirebaseVerificationDto = exports.UpdateUserPositionDto = exports.UpdateUserDto = exports.UserRegistrationDto = exports.UserAuthenticationDto = void 0;
const class_validator_1 = require("class-validator");
const swagger_1 = require("@nestjs/swagger");
class UserAuthenticationDto {
}
exports.UserAuthenticationDto = UserAuthenticationDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        type: String,
        description: 'token not found',
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], UserAuthenticationDto.prototype, "token", void 0);
class UserRegistrationDto {
}
exports.UserRegistrationDto = UserRegistrationDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        type: String,
        description: 'userName not found',
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], UserRegistrationDto.prototype, "userName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: String,
        description: 'email not found',
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], UserRegistrationDto.prototype, "email", void 0);
class UpdateUserDto {
}
exports.UpdateUserDto = UpdateUserDto;
__decorate([
    (0, swagger_1.ApiProperty)({ type: String, required: false }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateUserDto.prototype, "userName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: String, required: false }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateUserDto.prototype, "phone", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: String, required: false }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateUserDto.prototype, "countryCode", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: String, required: false }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateUserDto.prototype, "codePhone", void 0);
class UpdateUserPositionDto {
}
exports.UpdateUserPositionDto = UpdateUserPositionDto;
__decorate([
    (0, swagger_1.ApiProperty)({ type: String, required: false }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateUserPositionDto.prototype, "longitude", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: String, required: false }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateUserPositionDto.prototype, "latitude", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], UpdateUserPositionDto.prototype, "country", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], UpdateUserPositionDto.prototype, "town", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], UpdateUserPositionDto.prototype, "titleEmplacement", void 0);
class FirebaseVerificationDto {
}
exports.FirebaseVerificationDto = FirebaseVerificationDto;
//# sourceMappingURL=user.request.dto.js.map