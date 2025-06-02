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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RendezVousController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const dto_1 = require("../dto");
const providers_1 = require("../providers");
const decorators_1 = require("../../users/decorators");
const apiutils_1 = require("../../../common/apiutils");
const rendez_vous_request_dto_1 = require("../dto/rendez_vous.request.dto");
const main_database_connection_1 = require("../../../databases/main.database.connection");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = __importDefault(require("mongoose"));
const config_1 = require("@nestjs/config");
let RendezVousController = class RendezVousController {
    constructor(rendezVousService, userModel, agendaModel, realisationModel, realisationFileModel, realisationVideoModel, creneauModel, profileModel, positionModel, rendezVousModel, configService) {
        this.rendezVousService = rendezVousService;
        this.userModel = userModel;
        this.agendaModel = agendaModel;
        this.realisationModel = realisationModel;
        this.realisationFileModel = realisationFileModel;
        this.realisationVideoModel = realisationVideoModel;
        this.creneauModel = creneauModel;
        this.profileModel = profileModel;
        this.positionModel = positionModel;
        this.rendezVousModel = rendezVousModel;
        this.configService = configService;
    }
    async create(userId, dto) {
        const rendezVous = await this.rendezVousService.create(dto, userId);
        return await dto_1.RendezVousResponseDto.fromRendezVous(this.userModel, this.agendaModel, this.realisationModel, this.realisationFileModel, this.realisationVideoModel, this.creneauModel, this.profileModel, this.rendezVousModel, this.positionModel, rendezVous, this.configService);
    }
    async findUserRendezVous(userId, pagination) {
        const { data, total } = await this.rendezVousService.findUserRendezVous(userId, pagination);
        return apiutils_1.PaginationResponseDto.responseDto(pagination, data, total).mapPromise((l) => dto_1.RendezVousResponseDto.fromRendezVous(this.userModel, this.agendaModel, this.realisationModel, this.realisationFileModel, this.realisationVideoModel, this.creneauModel, this.profileModel, this.rendezVousModel, this.positionModel, l, this.configService));
    }
    async findPrestataireRendezVous(userId, pagination) {
        if (!mongoose_2.default.Types.ObjectId.isValid(userId)) {
            throw new common_1.BadRequestException('Invalid profile ID format');
        }
        const { data, total } = await this.rendezVousService.findPrestataireRendezVous(userId, pagination);
        return apiutils_1.PaginationResponseDto.responseDto(pagination, data, total).mapPromise((l) => dto_1.RendezVousResponseDto.fromRendezVous(this.userModel, this.agendaModel, this.realisationModel, this.realisationFileModel, this.realisationVideoModel, this.creneauModel, this.profileModel, this.rendezVousModel, this.positionModel, l, this.configService));
    }
    async fetchRdv(id) {
        const rendezVous = await this.rendezVousService.findRendezVousById(id);
        return dto_1.RendezVousResponseDto.fromRendezVous(this.userModel, this.agendaModel, this.realisationModel, this.realisationFileModel, this.realisationVideoModel, this.creneauModel, this.profileModel, this.rendezVousModel, this.positionModel, rendezVous, this.configService);
    }
    async acceptRdv(id) {
        const rendezVous = await this.rendezVousService.acceptRdv(id);
        return dto_1.RendezVousResponseDto.fromRendezVous(this.userModel, this.agendaModel, this.realisationModel, this.realisationFileModel, this.realisationVideoModel, this.creneauModel, this.profileModel, this.rendezVousModel, this.positionModel, rendezVous, this.configService);
    }
    async declineRdv(id) {
        const rendezVous = await this.rendezVousService.declineRdv(id);
        return dto_1.RendezVousResponseDto.fromRendezVous(this.userModel, this.agendaModel, this.realisationModel, this.realisationFileModel, this.realisationVideoModel, this.creneauModel, this.profileModel, this.rendezVousModel, this.positionModel, rendezVous, this.configService);
    }
    async delete(id) {
        await this.rendezVousService.deleteRdv(id);
    }
};
exports.RendezVousController = RendezVousController;
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({ summary: 'Create a new rendez-vous' }),
    (0, swagger_1.ApiOkResponse)({ type: dto_1.RendezVousResponseDto }),
    __param(0, (0, decorators_1.GetUser)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, rendez_vous_request_dto_1.CreateRendezVousDto]),
    __metadata("design:returntype", Promise)
], RendezVousController.prototype, "create", null);
__decorate([
    (0, common_1.Get)('/me'),
    (0, swagger_1.ApiOperation)({ summary: 'Get all rendez-vous for current user' }),
    (0, swagger_1.ApiOkResponse)({ type: (apiutils_1.PaginationResponseDto) }),
    __param(0, (0, decorators_1.GetUser)('id')),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, apiutils_1.PaginationPayloadDto]),
    __metadata("design:returntype", Promise)
], RendezVousController.prototype, "findUserRendezVous", null);
__decorate([
    (0, common_1.Get)('/professionnel/'),
    (0, swagger_1.ApiOperation)({ summary: 'Get all rendez-vous for a professional profile' }),
    (0, swagger_1.ApiParam)({ name: 'idProfessionnel', description: 'Professional profile ID' }),
    (0, swagger_1.ApiOkResponse)({ type: (apiutils_1.PaginationResponseDto) }),
    __param(0, (0, decorators_1.GetUser)('id')),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, apiutils_1.PaginationPayloadDto]),
    __metadata("design:returntype", Promise)
], RendezVousController.prototype, "findPrestataireRendezVous", null);
__decorate([
    (0, common_1.Get)('/:id'),
    (0, swagger_1.ApiOperation)({ summary: 'Get a rendez-vous' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Get Rendez-vous ID' }),
    (0, swagger_1.ApiOkResponse)({ type: dto_1.RendezVousResponseDto }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], RendezVousController.prototype, "fetchRdv", null);
__decorate([
    (0, common_1.Patch)('/:id/accept'),
    (0, swagger_1.ApiOperation)({ summary: 'Accept a rendez-vous' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Rendez-vous ID' }),
    (0, swagger_1.ApiOkResponse)({ type: dto_1.RendezVousResponseDto }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], RendezVousController.prototype, "acceptRdv", null);
__decorate([
    (0, common_1.Patch)('/:id/decline'),
    (0, swagger_1.ApiOperation)({ summary: 'Decline a rendez-vous' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Rendez-vous ID' }),
    (0, swagger_1.ApiOkResponse)({ type: dto_1.RendezVousResponseDto }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], RendezVousController.prototype, "declineRdv", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Delete a rendez-vous' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Rendez-vous ID' }),
    (0, swagger_1.ApiOkResponse)({ description: 'Rendez-vous successfully deleted' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], RendezVousController.prototype, "delete", null);
exports.RendezVousController = RendezVousController = __decorate([
    (0, swagger_1.ApiTags)('RendezVous'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.Controller)('rendez-vous'),
    (0, common_1.UseInterceptors)(common_1.ClassSerializerInterceptor),
    __param(1, (0, mongoose_1.InjectModel)(main_database_connection_1.USER_MODEL_NAME, main_database_connection_1.DATABASE_CONNECTION)),
    __param(2, (0, mongoose_1.InjectModel)(main_database_connection_1.AGENDA_MODEL_NAME, main_database_connection_1.DATABASE_CONNECTION)),
    __param(3, (0, mongoose_1.InjectModel)(main_database_connection_1.REALISATION_MODEL_NAME, main_database_connection_1.DATABASE_CONNECTION)),
    __param(4, (0, mongoose_1.InjectModel)(main_database_connection_1.REALISATION_FILE_MODEL_NAME, main_database_connection_1.DATABASE_CONNECTION)),
    __param(5, (0, mongoose_1.InjectModel)(main_database_connection_1.REALISATION_VIDEO_MODEL_NAME, main_database_connection_1.DATABASE_CONNECTION)),
    __param(6, (0, mongoose_1.InjectModel)(main_database_connection_1.CRENEAU_MODEL_NAME, main_database_connection_1.DATABASE_CONNECTION)),
    __param(7, (0, mongoose_1.InjectModel)(main_database_connection_1.PROFILE_PRO_MODEL_NAME, main_database_connection_1.DATABASE_CONNECTION)),
    __param(8, (0, mongoose_1.InjectModel)(main_database_connection_1.POSITION_MODEL_NAME, main_database_connection_1.DATABASE_CONNECTION)),
    __param(9, (0, mongoose_1.InjectModel)(main_database_connection_1.RENDEZ_VOUS_MODEL_NAME, main_database_connection_1.DATABASE_CONNECTION)),
    __metadata("design:paramtypes", [providers_1.RendezVousService, Object, Object, Object, Object, Object, Object, Object, Object, Object, config_1.ConfigService])
], RendezVousController);
//# sourceMappingURL=rendez_vous.controller.js.map