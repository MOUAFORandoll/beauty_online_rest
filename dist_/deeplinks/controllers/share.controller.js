"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ShareController = void 0;
const common_1 = require("@nestjs/common");
const fs_1 = __importDefault(require("fs"));
const config_1 = require("@nestjs/config");
const path = __importStar(require("node:path"));
const process = __importStar(require("node:process"));
const apiutils_1 = require("../../common/apiutils");
const providers_1 = require("../../app/profile_professionnels/providers");
const providers_2 = require("../../app/actu/providers");
const main_database_connection_1 = require("../../databases/main.database.connection");
const mongoose_1 = require("@nestjs/mongoose");
const actu_response_dto_1 = require("../../app/actu/dto/actu.response.dto");
let ShareController = class ShareController {
    constructor(configService, profileService, realisationFileModel, agendaModel, positionModel, realisationModel, rendezVousModel, vueModel, shareModel, likeModel, actuService) {
        this.configService = configService;
        this.profileService = profileService;
        this.realisationFileModel = realisationFileModel;
        this.agendaModel = agendaModel;
        this.positionModel = positionModel;
        this.realisationModel = realisationModel;
        this.rendezVousModel = rendezVousModel;
        this.vueModel = vueModel;
        this.shareModel = shareModel;
        this.likeModel = likeModel;
        this.actuService = actuService;
        this.appName = this.configService.get('DEEPLINKS_APP_NAME');
        const shareTemplate = path.resolve(process.cwd(), './src/deeplinks/dto/share.template.html');
        this.htmlContent = fs_1.default.readFileSync(shareTemplate, { encoding: 'utf-8' });
    }
    async findOneProById(id) {
        const profile = await this.profileService.findOneById(id);
        return this.fillTemplate({
            pageTitle: this.appName,
            title: profile.namePro,
            description: profile.description,
            image: profile.cover,
        });
    }
    async findOneActuById(id) {
        const actu = await this.actuService.findOneById(id);
        const actuFromDTP = actu_response_dto_1.ActuResponseDto.fromActu(actu, null, this.realisationFileModel, this.agendaModel, this.positionModel, this.realisationModel, this.rendezVousModel, this.vueModel, this.shareModel, this.likeModel, this.profileService);
        return this.fillTemplate({
            pageTitle: this.appName,
            title: (await actuFromDTP).title,
            description: (await actuFromDTP).nombre_likes +
                ' appréciation' +
                ((await actuFromDTP).nombre_likes > 1 ? 's' : '') +
                (await actuFromDTP).nombre_vues +
                ' vue' +
                ((await actuFromDTP).nombre_vues > 1 ? 's' : '') +
                ' et ' +
                (await actuFromDTP).nombre_partages +
                ' partage' +
                ((await actuFromDTP).nombre_partages > 1 ? 's' : ''),
            image: (await actuFromDTP).realisation_files[0] == null
                ? ''
                : (await actuFromDTP).realisation_files[0].file_path,
        });
    }
    fillTemplate(data) {
        return this.htmlContent
            .replaceAll('{{pageTitle}}', data.pageTitle ?? '')
            .replaceAll('{{title}}', data.title ?? '')
            .replaceAll('{{description}}', data.description ?? '')
            .replaceAll('{{image}}', data.image ?? '')
            .replaceAll('{{imageHeight}}', data.imageHeight ?? '1200')
            .replaceAll('{{imageWidth}}', data.imageWidth ?? '630')
            .replaceAll('{{appName}}', this.appName ?? '')
            .replaceAll('{{sitename}}', this.appName ?? '')
            .replaceAll('{{appleAppId}}', this.configService.get('APPLE_APP_ID') ?? '')
            .replaceAll('{{googleAppId}}', this.configService.get('GOOGLE_APP_ID') ?? '')
            .replaceAll('{{site}}', this.configService.get('WEB_URL') ?? '');
    }
};
exports.ShareController = ShareController;
__decorate([
    (0, common_1.Get)('/professionnel/:id'),
    (0, apiutils_1.Public)(),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, common_1.Header)('Content-Type', 'text/html; charset=utf-8'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ShareController.prototype, "findOneProById", null);
__decorate([
    (0, common_1.Get)('/actu/:id'),
    (0, apiutils_1.Public)(),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, common_1.Header)('Content-Type', 'text/html; charset=utf-8'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ShareController.prototype, "findOneActuById", null);
exports.ShareController = ShareController = __decorate([
    (0, common_1.Controller)(),
    __param(2, (0, mongoose_1.InjectModel)(main_database_connection_1.REALISATION_FILE_MODEL_NAME, main_database_connection_1.DATABASE_CONNECTION)),
    __param(3, (0, mongoose_1.InjectModel)(main_database_connection_1.AGENDA_MODEL_NAME, main_database_connection_1.DATABASE_CONNECTION)),
    __param(4, (0, mongoose_1.InjectModel)(main_database_connection_1.POSITION_MODEL_NAME, main_database_connection_1.DATABASE_CONNECTION)),
    __param(5, (0, mongoose_1.InjectModel)(main_database_connection_1.REALISATION_MODEL_NAME, main_database_connection_1.DATABASE_CONNECTION)),
    __param(6, (0, mongoose_1.InjectModel)(main_database_connection_1.RENDEZ_VOUS_MODEL_NAME, main_database_connection_1.DATABASE_CONNECTION)),
    __param(7, (0, mongoose_1.InjectModel)(main_database_connection_1.VUE_REALISATION_MODEL_NAME, main_database_connection_1.DATABASE_CONNECTION)),
    __param(8, (0, mongoose_1.InjectModel)(main_database_connection_1.SHARE_REALISATION_MODEL_NAME, main_database_connection_1.DATABASE_CONNECTION)),
    __param(9, (0, mongoose_1.InjectModel)(main_database_connection_1.LIKE_REALISATION_MODEL_NAME, main_database_connection_1.DATABASE_CONNECTION)),
    __metadata("design:paramtypes", [config_1.ConfigService,
        providers_1.ProfileService, Object, Object, Object, Object, Object, Object, Object, Object, providers_2.ActuService])
], ShareController);
//# sourceMappingURL=share.controller.js.map