"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotificationsModule = void 0;
const common_1 = require("@nestjs/common");
const providers_1 = require("./providers");
const axios_1 = require("@nestjs/axios");
const config_1 = require("@nestjs/config");
const main_database_module_1 = require("../../../databases/main.database.module");
const external_module_1 = require("../external/external.module");
let NotificationsModule = class NotificationsModule {
};
exports.NotificationsModule = NotificationsModule;
exports.NotificationsModule = NotificationsModule = __decorate([
    (0, common_1.Module)({
        imports: [main_database_module_1.MainDatabaseModule, external_module_1.ExternalModule, axios_1.HttpModule, config_1.ConfigModule],
        providers: [providers_1.SendNotificationsService],
        exports: [providers_1.SendNotificationsService],
    })
], NotificationsModule);
//# sourceMappingURL=notifications.module.js.map