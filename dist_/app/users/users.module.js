"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersModule = void 0;
const common_1 = require("@nestjs/common");
const controllers_1 = require("./controllers");
const providers_1 = require("./providers");
const core_1 = require("@nestjs/core");
const main_database_module_1 = require("../../databases/main.database.module");
const external_module_1 = require("../../common/modules/external/external.module");
const notifications_module_1 = require("../../common/modules/notifications/notifications.module");
let UsersModule = class UsersModule {
};
exports.UsersModule = UsersModule;
exports.UsersModule = UsersModule = __decorate([
    (0, common_1.Module)({
        imports: [main_database_module_1.MainDatabaseModule, external_module_1.ExternalModule, notifications_module_1.NotificationsModule],
        providers: [
            providers_1.AuthFirebaseService,
            providers_1.UsersService,
            providers_1.AuthService,
            providers_1.NotificationsService,
            {
                provide: core_1.APP_GUARD,
                useClass: providers_1.AuthClientGuard,
            },
        ],
        controllers: [controllers_1.AuthController, controllers_1.UsersController, controllers_1.NotificationsController],
        exports: [providers_1.AuthFirebaseService, providers_1.UsersService, providers_1.AuthService, providers_1.NotificationsService],
    })
], UsersModule);
//# sourceMappingURL=users.module.js.map