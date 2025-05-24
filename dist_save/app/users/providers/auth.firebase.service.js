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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthFirebaseService = void 0;
const common_1 = require("@nestjs/common");
const app_1 = require("firebase-admin/app");
const firebase_admin_1 = __importDefault(require("firebase-admin"));
const fs_1 = __importDefault(require("fs"));
const config_1 = require("@nestjs/config");
const auth_1 = require("firebase-admin/auth");
const firebase_1 = require("../../../common/services/firebase");
let AuthFirebaseService = class AuthFirebaseService {
    constructor(configService) {
        this.configService = configService;
        this.init();
    }
    init() {
        if ((0, app_1.getApps)().length > 0) {
            this.app = (0, app_1.getApps)()[0];
            return;
        }
        const jsonData = fs_1.default.readFileSync(this.configService.get('FIREBASE_SECRET_PATH')).toString();
        const appName = this.configService.get('APP_NAME');
        const secret = JSON.parse(jsonData);
        this.app = firebase_admin_1.default.initializeApp({
            credential: firebase_admin_1.default.credential.cert(secret),
        }, appName);
    }
    async verifyToken(token) {
        try {
            const decodedToken = await (0, auth_1.getAuth)(this.app).verifyIdToken(token);
            console.log({
                uid: decodedToken.uid,
                email: decodedToken.email,
                email_verified: decodedToken.email_verified,
                userFireBase: await (0, auth_1.getAuth)(firebase_1.FirebaseApp).getUser(decodedToken.uid),
                authProvider: decodedToken.firebase.sign_in_provider,
            });
            return {
                uid: decodedToken.uid,
                email: decodedToken.email,
                email_verified: decodedToken.email_verified,
                userFireBase: await (0, auth_1.getAuth)(firebase_1.FirebaseApp).getUser(decodedToken.uid),
                authProvider: decodedToken.firebase.sign_in_provider,
            };
        }
        catch (error) {
            console.error('Token verification failed:', error);
            return {
                email_verified: false,
            };
        }
    }
};
exports.AuthFirebaseService = AuthFirebaseService;
exports.AuthFirebaseService = AuthFirebaseService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], AuthFirebaseService);
//# sourceMappingURL=auth.firebase.service.js.map