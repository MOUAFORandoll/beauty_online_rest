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
exports.AuthClientGuard = void 0;
const auth_1 = require("firebase-admin/auth");
const mongoose_1 = require("@nestjs/mongoose");
const common_1 = require("@nestjs/common");
const firebase_1 = require("../../../common/services/firebase");
const core_1 = require("@nestjs/core");
const apiutils_1 = require("../../../common/apiutils");
const main_database_connection_1 = require("../../../databases/main.database.connection");
const config_1 = require("@nestjs/config");
let AuthClientGuard = class AuthClientGuard {
    constructor(user, reflector, configService) {
        this.user = user;
        this.reflector = reflector;
        this.configService = configService;
    }
    async canActivate(context) {
        return this.developmentCanActivate(context);
    }
    async productionCanActivate(context) {
        const ctx = context.switchToHttp();
        const request = ctx.getRequest();
        const isPublic = (0, apiutils_1.checkIsPublic)(this.reflector, context);
        if (isPublic)
            return true;
        const authHeader = request.headers.authorization;
        if (!authHeader) {
            return false;
        }
        const [bearer, token] = authHeader.split(' ');
        console.log(bearer, token);
        if (bearer !== 'Bearer' || !token) {
            return false;
        }
        if (!firebase_1.FirebaseApp) {
            return false;
        }
        const decodedToken = await (0, auth_1.getAuth)(firebase_1.FirebaseApp).verifyIdToken(token);
        if (!decodedToken) {
            return false;
        }
        const user = await this.user.findOne({ firebaseUID: decodedToken.uid }).lean().exec();
        if (!user)
            return false;
        request['user'] = { id: user._id };
        return true;
    }
    async developmentCanActivate(context) {
        const ctx = context.switchToHttp();
        const request = ctx.getRequest();
        const isPublic = (0, apiutils_1.checkIsPublic)(this.reflector, context);
        if (isPublic)
            return true;
        const userId = request.headers.uid;
        const user = await this.user.findById(userId).lean().exec();
        if (!user)
            return false;
        request['user'] = { id: user._id };
        return true;
    }
};
exports.AuthClientGuard = AuthClientGuard;
exports.AuthClientGuard = AuthClientGuard = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(main_database_connection_1.USER_MODEL_NAME, main_database_connection_1.DATABASE_CONNECTION)),
    __metadata("design:paramtypes", [Object, core_1.Reflector,
        config_1.ConfigService])
], AuthClientGuard);
//# sourceMappingURL=auth.client.guard.js.map