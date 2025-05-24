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
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const users_module_1 = require("./app/users/users.module");
const config_1 = require("@nestjs/config");
const main_database_module_1 = require("./databases/main.database.module");
const profile_module_1 = require("./app/profile_professionnels/profile.module");
const rendez_vous_module_1 = require("./app/rendez_vous/rendez_vous.module");
const actu_module_1 = require("./app/actu/actu.module");
const http_logger_service_1 = __importDefault(require("./common/logger/providers/http_logger.service"));
const logger_module_1 = require("./common/logger/logger.module");
const notifications_module_1 = require("./common/modules/notifications/notifications.module");
let AppModule = class AppModule {
    constructor(loggerService) {
        this.loggerService = loggerService;
    }
    configure(consumer) {
        const loggerService = this.loggerService;
        loggerService.setAppName('MAIN API');
        consumer.apply((req, res, next) => loggerService.use(req, res, next)).forRoutes('{*path}');
    }
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                isGlobal: true,
                envFilePath: '.env',
            }),
            logger_module_1.LoggerModule,
            notifications_module_1.NotificationsModule,
            users_module_1.UsersModule,
            profile_module_1.ProfileModule,
            rendez_vous_module_1.RendezVousModule,
            actu_module_1.ActuModule,
            main_database_module_1.MainDatabaseModule,
        ],
        controllers: [],
        providers: [common_1.Logger],
    }),
    __metadata("design:paramtypes", [http_logger_service_1.default])
], AppModule);
//# sourceMappingURL=app.module.js.map