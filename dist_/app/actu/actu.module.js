"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ActuModule = void 0;
const common_1 = require("@nestjs/common");
const controllers_1 = require("./controllers");
const providers_1 = require("./providers");
const main_database_module_1 = require("../../databases/main.database.module");
const aws_module_1 = require("../../common/modules/aws/aws.module");
const providers_2 = require("../profile_professionnels/providers");
const controllers_2 = require("../profile_professionnels/controllers");
let ActuModule = class ActuModule {
};
exports.ActuModule = ActuModule;
exports.ActuModule = ActuModule = __decorate([
    (0, common_1.Module)({
        imports: [main_database_module_1.MainDatabaseModule, aws_module_1.AwsModule],
        providers: [providers_2.ProfileService, providers_1.ActuService],
        controllers: [controllers_2.ProfileController, controllers_1.ActuController],
        exports: [providers_2.ProfileService, providers_1.ActuService],
    })
], ActuModule);
//# sourceMappingURL=actu.module.js.map