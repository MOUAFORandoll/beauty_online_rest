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
exports.IAppErrorDto = exports.IAppError = void 0;
exports.isAppErrorObject = isAppErrorObject;
const types_1 = require("../types");
const swagger_1 = require("@nestjs/swagger");
class IAppError {
}
exports.IAppError = IAppError;
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], IAppError.prototype, "code", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], IAppError.prototype, "message", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false, type: [types_1.IDisplayText] }),
    __metadata("design:type", Array)
], IAppError.prototype, "display_messages", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    __metadata("design:type", Object)
], IAppError.prototype, "details", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    __metadata("design:type", Number)
], IAppError.prototype, "status_code", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    __metadata("design:type", String)
], IAppError.prototype, "url", void 0);
class IAppErrorDto {
}
exports.IAppErrorDto = IAppErrorDto;
__decorate([
    (0, swagger_1.ApiProperty)({ type: IAppError }),
    __metadata("design:type", IAppError)
], IAppErrorDto.prototype, "error", void 0);
function isAppErrorObject(o) {
    return o && 'code' in o && 'message' in o;
}
//# sourceMappingURL=apperror.js.map