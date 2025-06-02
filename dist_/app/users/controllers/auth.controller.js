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
exports.AuthController = void 0;
const swagger_1 = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const dto_1 = require("../dto");
const errors_1 = require("../../../common/errors");
const providers_1 = require("../providers");
const apiutils_1 = require("../../../common/apiutils");
let AuthController = class AuthController {
    constructor(authService) {
        this.authService = authService;
    }
    async authenticateUser(payload) {
        const user = await this.authService.authentication(payload);
        return { user: dto_1.UserDto.fromUser(user) };
    }
};
exports.AuthController = AuthController;
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({
        summary: 'Authenticate a user',
    }),
    (0, swagger_1.ApiOkResponse)({ type: dto_1.UserAuthenticationResponseDto }),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, apiutils_1.Public)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.UserAuthenticationDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "authenticateUser", null);
exports.AuthController = AuthController = __decorate([
    (0, swagger_1.ApiTags)('Auth'),
    (0, swagger_1.ApiResponse)({
        status: '4XX',
        type: errors_1.IAppErrorDto,
    }),
    (0, swagger_1.ApiResponse)({
        status: '5XX',
        type: errors_1.IAppErrorDto,
    }),
    (0, common_1.Controller)('auth'),
    __metadata("design:paramtypes", [providers_1.AuthService])
], AuthController);
//# sourceMappingURL=auth.controller.js.map