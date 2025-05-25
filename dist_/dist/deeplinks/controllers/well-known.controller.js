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
exports.WellKnownController = exports.WELL_KNOWN_CONTROLLER_NAME = void 0;
const common_1 = require("@nestjs/common");
const fs_1 = __importDefault(require("fs"));
const config_1 = require("@nestjs/config");
const apiutils_1 = require("../../common/apiutils");
exports.WELL_KNOWN_CONTROLLER_NAME = '.well-known';
let WellKnownController = class WellKnownController {
    constructor(configService) {
        this.configService = configService;
        const assetLinksPath = this.configService.get('ASSETLINKS_PATH');
        this.assetLinksData = JSON.parse(fs_1.default.readFileSync(assetLinksPath).toString());
        const appleAppSiteAssociationPath = this.configService.get('APPLE_APP_SITE_ASSOCIATION_PATH');
        this.appleAppSiteAssociationLinksData = JSON.parse(fs_1.default.readFileSync(appleAppSiteAssociationPath).toString());
    }
    assetLinks() {
        return this.assetLinksData;
    }
    appleAppSiteAssociation() {
        return this.appleAppSiteAssociationLinksData;
    }
};
exports.WellKnownController = WellKnownController;
__decorate([
    (0, common_1.Get)('assetlinks.json'),
    (0, apiutils_1.Public)(),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, common_1.Header)('Content-Type', 'application/json'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], WellKnownController.prototype, "assetLinks", null);
__decorate([
    (0, common_1.Get)('apple-app-site-association'),
    (0, apiutils_1.Public)(),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, common_1.Header)('Content-Type', 'application/json'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], WellKnownController.prototype, "appleAppSiteAssociation", null);
exports.WellKnownController = WellKnownController = __decorate([
    (0, common_1.Controller)(exports.WELL_KNOWN_CONTROLLER_NAME),
    __metadata("design:paramtypes", [config_1.ConfigService])
], WellKnownController);
//# sourceMappingURL=well-known.controller.js.map