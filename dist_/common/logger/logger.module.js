"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoggerModule = void 0;
const common_1 = require("@nestjs/common");
const http_logger_service_1 = __importDefault(require("./providers/http_logger.service"));
const config_1 = require("@nestjs/config");
const providers_1 = require("./providers");
let LoggerModule = class LoggerModule {
};
exports.LoggerModule = LoggerModule;
exports.LoggerModule = LoggerModule = __decorate([
    (0, common_1.Module)({
        imports: [config_1.ConfigModule],
        providers: [http_logger_service_1.default, providers_1.StringsHelperService, common_1.Logger],
        exports: [http_logger_service_1.default, providers_1.StringsHelperService],
    })
], LoggerModule);
//# sourceMappingURL=logger.module.js.map