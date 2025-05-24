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
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const auth_firebase_service_1 = require("./auth.firebase.service");
const errors_1 = require("../errors");
const internal_1 = require("../../../common/errors/internal");
const firebase_1 = require("../../../common/services/firebase");
const main_database_connection_1 = require("../../../databases/main.database.connection");
let AuthService = class AuthService {
    constructor(userModel, firebaseAuthService) {
        this.userModel = userModel;
        this.firebaseAuthService = firebaseAuthService;
    }
    async authentication(payload) {
        if (!firebase_1.FirebaseApp)
            throw new internal_1.AppInternalServerError('[FIREBASE] Firebase app not initialized');
        const { token } = payload;
        const { email, authProvider, userFireBase, uid } = await this.firebaseAuthService.verifyToken(token);
        console.log(email, authProvider, userFireBase, uid);
        if (!email) {
            throw new common_1.ForbiddenException(errors_1.UserErrors[errors_1.FIREBASE_AUTH_FAILED]);
        }
        const user = await this.userModel.findOne({ email: email }).exec();
        if (!user) {
            console.log('fdff');
            return await this.createUserWithFirebaseUID(uid, email, authProvider, userFireBase);
        }
        console.log(1234);
        console.log('0000');
        return user;
    }
    async createUserWithFirebaseUID(uid, email, authProvider, userFireBase) {
        let newUser = await new this.userModel({
            email,
            firebaseUID: uid,
        }).save();
        if (userFireBase) {
            newUser.userName = userFireBase.displayName;
            newUser.authProvider = authProvider;
            newUser.pictureUrl = userFireBase.photoURL;
        }
        newUser = await newUser.save();
        return newUser;
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(main_database_connection_1.USER_MODEL_NAME, main_database_connection_1.DATABASE_CONNECTION)),
    __metadata("design:paramtypes", [Object, auth_firebase_service_1.AuthFirebaseService])
], AuthService);
//# sourceMappingURL=auth.service.js.map