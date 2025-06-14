"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExternalModule = void 0;
const common_1 = require("@nestjs/common");
const providers_1 = require("./providers");
const mailer_1 = require("@nestjs-modules/mailer");
const config_1 = require("@nestjs/config");
let ExternalModule = class ExternalModule {
};
exports.ExternalModule = ExternalModule;
exports.ExternalModule = ExternalModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({ isGlobal: true }),
            mailer_1.MailerModule.forRootAsync({
                useFactory: async (config) => ({
                    transport: {
                        host: 'smtp.gmail.com',
                        port: 587,
                        secure: false,
                        auth: {
                            user: config.get('MAIL_USER'),
                            pass: config.get('MAIL_PASS'),
                        },
                    },
                    defaults: {
                        from: `"${config.get('MAIL_FROM_NAME')}" <${config.get('MAIL_USER')}>`,
                    },
                }),
                inject: [config_1.ConfigService],
            }),
        ],
        providers: [providers_1.StorageService, providers_1.EmailService],
        exports: [providers_1.StorageService, providers_1.EmailService],
    })
], ExternalModule);
//# sourceMappingURL=external.module.js.map