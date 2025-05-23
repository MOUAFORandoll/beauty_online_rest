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
exports.UserAuthenticationResponseDto = exports.UserDto = void 0;
const swagger_1 = require("@nestjs/swagger");
class UserDto {
    static fromUser(user) {
        return {
            id: user._id.toString(),
            pictureUrl: user.pictureUrl,
            email: user.email,
            userName: user.userName,
            firebaseUID: user.firebaseUID,
            authProvider: user.authProvider,
            countryCode: user.countryCode,
            codePhone: user.codePhone,
            phone: user.phone,
        };
    }
}
exports.UserDto = UserDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        type: String,
    }),
    __metadata("design:type", String)
], UserDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: String,
    }),
    __metadata("design:type", String)
], UserDto.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: String,
    }),
    __metadata("design:type", String)
], UserDto.prototype, "pictureUrl", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: String,
    }),
    __metadata("design:type", String)
], UserDto.prototype, "userName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: String,
    }),
    __metadata("design:type", String)
], UserDto.prototype, "firebaseUID", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: String,
    }),
    __metadata("design:type", String)
], UserDto.prototype, "countryCode", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: String,
    }),
    __metadata("design:type", String)
], UserDto.prototype, "phone", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: String }),
    __metadata("design:type", String)
], UserDto.prototype, "authProvider", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: String }),
    __metadata("design:type", String)
], UserDto.prototype, "codePhone", void 0);
class UserAuthenticationResponseDto {
}
exports.UserAuthenticationResponseDto = UserAuthenticationResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({ type: UserDto }),
    __metadata("design:type", UserDto)
], UserAuthenticationResponseDto.prototype, "user", void 0);
//# sourceMappingURL=users.response.dto.js.map