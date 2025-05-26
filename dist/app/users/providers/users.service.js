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
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const main_database_connection_1 = require("../../../databases/main.database.connection");
const Database = __importStar(require("../../../databases/users/providers"));
const mongoose_1 = require("@nestjs/mongoose");
const providers_1 = require("../../../common/modules/aws/providers");
let UsersService = class UsersService {
    constructor(positionModel, usersService, storageService) {
        this.positionModel = positionModel;
        this.usersService = usersService;
        this.storageService = storageService;
    }
    async updateUserData(id, data) {
        const user = await this.usersService.getUser(id);
        if (data.userName)
            user.userName = data.userName;
        if (data.phone)
            user.phone = data.phone;
        if (data.countryCode)
            user.countryCode = data.countryCode;
        if (data.codePhone)
            user.codePhone = data.codePhone;
        return user.save();
    }
    async updateUserPhone(id, countryCode, codePhone, phone) {
        const user = await this.usersService.getUser(id);
        user.countryCode = countryCode;
        user.codePhone = codePhone;
        user.phone = phone;
        return user.save();
    }
    async updateUserPhoto(photo, id) {
        try {
            const user = await this.usersService.getUser(id);
            if (photo) {
                user.pictureUrl = await this.storageService.userProfilePath(photo, user._id.toString());
            }
            return user.save();
        }
        catch (error) {
            throw new Error(`Failed to create profile: ${error.message}`);
        }
    }
    async updateUserPosition(user_id, dto) {
        const position = new this.positionModel({ ...dto }, user_id);
        await position.save();
    }
    async notificationToken(user_id, notification_token) {
        const user = await this.usersService.getUser(user_id);
        console.log(notification_token);
        if (notification_token) {
            user.firebaseNotificationToken = notification_token;
        }
        await user.save();
    }
};
exports.UsersService = UsersService;
exports.UsersService = UsersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(main_database_connection_1.POSITION_MODEL_NAME, main_database_connection_1.DATABASE_CONNECTION)),
    __metadata("design:paramtypes", [Object, Database.UsersService, providers_1.StorageService])
], UsersService);
//# sourceMappingURL=users.service.js.map