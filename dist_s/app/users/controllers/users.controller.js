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
exports.UsersController = void 0;
const common_1 = require("@nestjs/common");
const providers_1 = require("../providers");
const swagger_1 = require("@nestjs/swagger");
const dto_1 = require("../dto");
const decorators_1 = require("../decorators");
const Database = __importStar(require("../../../databases/users/providers"));
const platform_express_1 = require("@nestjs/platform-express");
const providers_2 = require("../../../common/modules/notifications/providers");
const api_decorators_1 = require("../../../common/apiutils/api.decorators");
const providers_3 = require("../../../common/modules/external/providers");
let UsersController = class UsersController {
    constructor(usersService, dbUsersService, sendNotificationsService, emailService) {
        this.usersService = usersService;
        this.dbUsersService = dbUsersService;
        this.sendNotificationsService = sendNotificationsService;
        this.emailService = emailService;
    }
    async findOneUser(id) {
        const user = await this.dbUsersService.getUser(id);
        return dto_1.UserDto.fromUser(user);
    }
    async findAllUser() {
        const users = await this.dbUsersService.getAllUsers();
        return users.map((user) => dto_1.UserDto.fromUser(user));
    }
    async sendNotif() {
        const user = await this.dbUsersService.getUser('68156b0b5ad449e5c595ebb6');
        await this.emailService.sendEmail(user.email, 'Welcome', 'BienVenu');
        await this.sendNotificationsService.sendWelcome(user);
    }
    async updateUserData(id, payload) {
        const user = await this.usersService.updateUserData(id, payload);
        return dto_1.UserDto.fromUser(user);
    }
    async updateUserPicture(id, image) {
        await this.dbUsersService.getUser(id);
        const user = await this.usersService.updateUserPhoto(image, id);
        return dto_1.UserDto.fromUser(user);
    }
    async updateUserPosition(id, payload) {
        await this.usersService.updateUserPosition(id, payload);
    }
    async notificationToken(id, payload) {
        await this.usersService.notificationToken(id, payload.notification_token);
    }
};
exports.UsersController = UsersController;
__decorate([
    (0, common_1.Get)('/me'),
    (0, swagger_1.ApiOperation)({
        summary: 'Retrieves a user by their  token',
    }),
    (0, swagger_1.ApiOkResponse)({ type: dto_1.UserDto }),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, decorators_1.GetUser)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "findOneUser", null);
__decorate([
    (0, common_1.Get)('/all'),
    (0, swagger_1.ApiOperation)({
        summary: 'Retrieves all ',
    }),
    (0, api_decorators_1.Public)(),
    (0, swagger_1.ApiOkResponse)({ type: dto_1.UserDto }),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "findAllUser", null);
__decorate([
    (0, common_1.Get)('/send-notif'),
    (0, swagger_1.ApiOperation)({
        summary: 'Retrieves a user by their  token',
    }),
    (0, api_decorators_1.Public)(),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "sendNotif", null);
__decorate([
    (0, common_1.Patch)(''),
    (0, swagger_1.ApiOperation)({
        summary: 'Update user information',
    }),
    (0, swagger_1.ApiOkResponse)({ type: dto_1.UserAuthenticationResponseDto }),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, decorators_1.GetUser)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, dto_1.UpdateUserDto]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "updateUserData", null);
__decorate([
    (0, common_1.Patch)('/picture'),
    (0, swagger_1.ApiOperation)({
        summary: 'create user profile',
    }),
    (0, swagger_1.ApiConsumes)('multipart/form-data'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('image')),
    (0, swagger_1.ApiOkResponse)({ type: dto_1.UserDto }),
    __param(0, (0, decorators_1.GetUser)('id')),
    __param(1, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "updateUserPicture", null);
__decorate([
    (0, common_1.Patch)('/update-position'),
    (0, swagger_1.ApiOperation)({
        summary: 'Update user position',
    }),
    (0, swagger_1.ApiOkResponse)(),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, decorators_1.GetUser)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, dto_1.UpdateUserPositionDto]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "updateUserPosition", null);
__decorate([
    (0, common_1.Patch)('/notification'),
    (0, swagger_1.ApiOperation)({
        summary: 'Firebase notification token of the user',
    }),
    (0, swagger_1.ApiOkResponse)(),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, decorators_1.GetUser)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "notificationToken", null);
exports.UsersController = UsersController = __decorate([
    (0, common_1.Controller)('users'),
    __metadata("design:paramtypes", [providers_1.UsersService, Database.UsersService, providers_2.SendNotificationsService,
        providers_3.EmailService])
], UsersController);
//# sourceMappingURL=users.controller.js.map