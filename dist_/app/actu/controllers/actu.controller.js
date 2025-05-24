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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ActuController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const dto_1 = require("../dto");
const providers_1 = require("../providers");
const Database = __importStar(require("../../../databases/users/providers"));
const apiutils_1 = require("../../../common/apiutils");
const entities_1 = require("../../../databases/services/entities");
const main_database_connection_1 = require("../../../databases/main.database.connection");
const mongoose_1 = require("@nestjs/mongoose");
const providers_2 = require("../../profile_professionnels/providers");
const response_dto_1 = require("../../../common/ClassActions/response.dto");
const decorators_1 = require("../../users/decorators");
let ActuController = class ActuController {
    constructor(realisationFileModel, actuService, agendaModel, positionModel, realisationModel, rendezVousModel, vueModel, shareModel, profileService, dbUsersService) {
        this.realisationFileModel = realisationFileModel;
        this.actuService = actuService;
        this.agendaModel = agendaModel;
        this.positionModel = positionModel;
        this.realisationModel = realisationModel;
        this.rendezVousModel = rendezVousModel;
        this.vueModel = vueModel;
        this.shareModel = shareModel;
        this.profileService = profileService;
        this.dbUsersService = dbUsersService;
    }
    async findAll(pagination) {
        const { data, total } = await this.actuService.findAll(pagination);
        return apiutils_1.PaginationResponseDto.responseDto(pagination, data, total).mapPromise((l) => dto_1.ActuResponseDto.fromActu(l, this.realisationFileModel, this.agendaModel, this.positionModel, this.realisationModel, this.rendezVousModel, this.vueModel, this.shareModel, this.profileService));
    }
    async findOneById(id) {
        const actu = await this.actuService.findOneById(id);
        return dto_1.ActuResponseDto.fromActu(actu, this.realisationFileModel, this.agendaModel, this.positionModel, this.realisationModel, this.rendezVousModel, this.vueModel, this.shareModel, this.profileService);
    }
    async shareActu(actuId, userId) {
        console.log(actuId, userId);
        const shareLink = await this.actuService.shareActu(actuId, userId);
        return { shareLink };
    }
    vueActu(actuId, userId) {
        console.log(actuId, userId);
        this.actuService.vueActu(actuId, userId);
    }
};
exports.ActuController = ActuController;
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({
        summary: 'Find All profile',
    }),
    (0, swagger_1.ApiOkResponse)({ type: apiutils_1.PaginationPayloadDto }),
    (0, apiutils_1.Public)(),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [apiutils_1.PaginationPayloadDto]),
    __metadata("design:returntype", Promise)
], ActuController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({
        summary: 'Find actu by id',
    }),
    (0, apiutils_1.Public)(),
    (0, swagger_1.ApiOkResponse)({ type: dto_1.ActuResponseDto }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ActuController.prototype, "findOneById", null);
__decorate([
    (0, common_1.Get)(':id/share'),
    (0, swagger_1.ApiOkResponse)({ type: response_dto_1.ShareLink }),
    (0, swagger_1.ApiOperation)({
        summary: 'Actu Share link',
    }),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, decorators_1.GetUser)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], ActuController.prototype, "shareActu", null);
__decorate([
    (0, common_1.Get)(':id/vue'),
    (0, swagger_1.ApiOperation)({
        summary: 'Actu Share link',
    }),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, decorators_1.GetUser)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], ActuController.prototype, "vueActu", null);
exports.ActuController = ActuController = __decorate([
    (0, swagger_1.ApiTags)('Actus'),
    (0, common_1.Controller)('actus'),
    __param(0, (0, mongoose_1.InjectModel)(entities_1.REALISATION_FILE_MODEL_NAME, main_database_connection_1.DATABASE_CONNECTION)),
    __param(2, (0, mongoose_1.InjectModel)(entities_1.AGENDA_MODEL_NAME, main_database_connection_1.DATABASE_CONNECTION)),
    __param(3, (0, mongoose_1.InjectModel)(main_database_connection_1.POSITION_MODEL_NAME, main_database_connection_1.DATABASE_CONNECTION)),
    __param(4, (0, mongoose_1.InjectModel)(entities_1.REALISATION_MODEL_NAME, main_database_connection_1.DATABASE_CONNECTION)),
    __param(5, (0, mongoose_1.InjectModel)(entities_1.RENDEZ_VOUS_MODEL_NAME, main_database_connection_1.DATABASE_CONNECTION)),
    __param(6, (0, mongoose_1.InjectModel)(entities_1.VUE_MODEL_NAME, main_database_connection_1.DATABASE_CONNECTION)),
    __param(7, (0, mongoose_1.InjectModel)(entities_1.SHARE_MODEL_NAME, main_database_connection_1.DATABASE_CONNECTION)),
    __metadata("design:paramtypes", [Object, providers_1.ActuService, Object, Object, Object, Object, Object, Object, providers_2.ProfileService, Database.UsersService])
], ActuController);
//# sourceMappingURL=actu.controller.js.map