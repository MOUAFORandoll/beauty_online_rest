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
exports.AgendaController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const dto_1 = require("../dto");
const providers_1 = require("../providers");
const decorators_1 = require("../../users/decorators");
const Database = __importStar(require("../../../databases/users/providers"));
const apiutils_1 = require("../../../common/apiutils");
const agenda_request_dto_1 = require("../dto/agenda.request.dto");
const main_database_connection_1 = require("../../../databases/main.database.connection");
const mongoose_1 = require("@nestjs/mongoose");
let AgendaController = class AgendaController {
    constructor(creneauModel, agendaService, dbUsersService) {
        this.creneauModel = creneauModel;
        this.agendaService = agendaService;
        this.dbUsersService = dbUsersService;
    }
    async create(id, dto) {
        await this.dbUsersService.getUser(id);
        const agenda = await this.agendaService.create(dto, id);
        return await dto_1.AgendaResponseDto.fromAgenda(agenda, this.creneauModel);
    }
    async findMeProfessionalAgenda(idUser, pagination) {
        const { data, total } = await this.agendaService.findMeProfessionalAgenda(idUser, pagination);
        return apiutils_1.PaginationResponseDto.responseDto(pagination, data, total).mapPromise((l) => dto_1.AgendaResponseDto.fromAgenda(l, this.creneauModel));
    }
    async findProfessionalAgenda(idProfessionnel, pagination) {
        const { data, total } = await this.agendaService.findProfessionalAgenda(idProfessionnel, pagination);
        return apiutils_1.PaginationResponseDto.responseDto(pagination, data, total).mapPromise((l) => dto_1.AgendaResponseDto.fromAgenda(l, this.creneauModel));
    }
    async addCreneauxToAgenda(idAgenda, idUser, dto) {
        await this.dbUsersService.getUser(idUser);
        const agenda = await this.agendaService.addCreneauxToAgenda(idAgenda, dto);
        return await dto_1.AgendaResponseDto.fromAgenda(agenda, this.creneauModel);
    }
    async deleteCreneau(idCreneau, idUser) {
        await this.dbUsersService.getUser(idUser);
        await this.agendaService.deleteCreneau(idCreneau);
    }
    async update(id, idUser, dto) {
        await this.dbUsersService.getUser(idUser);
        const agenda = await this.agendaService.update(id, dto);
        return await dto_1.AgendaResponseDto.fromAgenda(agenda, this.creneauModel);
    }
    async delete(id, idUser) {
        await this.dbUsersService.getUser(idUser);
        await this.agendaService.delete(id);
    }
};
exports.AgendaController = AgendaController;
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({
        summary: 'create agenda',
    }),
    (0, swagger_1.ApiOkResponse)({ type: dto_1.AgendaResponseDto }),
    __param(0, (0, decorators_1.GetUser)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, agenda_request_dto_1.CreateAgendaDto]),
    __metadata("design:returntype", Promise)
], AgendaController.prototype, "create", null);
__decorate([
    (0, common_1.Get)('/me'),
    (0, swagger_1.ApiOperation)({
        summary: 'Find my agenda',
    }),
    __param(0, (0, decorators_1.GetUser)('id')),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, apiutils_1.PaginationPayloadDto]),
    __metadata("design:returntype", Promise)
], AgendaController.prototype, "findMeProfessionalAgenda", null);
__decorate([
    (0, common_1.Get)('/professional/:idProfessionnel'),
    (0, swagger_1.ApiOperation)({
        summary: 'Find professional agenda',
    }),
    __param(0, (0, common_1.Param)('idProfessionnel')),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, apiutils_1.PaginationPayloadDto]),
    __metadata("design:returntype", Promise)
], AgendaController.prototype, "findProfessionalAgenda", null);
__decorate([
    (0, common_1.Post)('/:idAgenda/creneau'),
    (0, swagger_1.ApiOperation)({
        summary: 'add creneau user agenda',
    }),
    __param(0, (0, common_1.Param)('idAgenda')),
    __param(1, (0, decorators_1.GetUser)('id')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, agenda_request_dto_1.AddCreneauxAgendaDto]),
    __metadata("design:returntype", Promise)
], AgendaController.prototype, "addCreneauxToAgenda", null);
__decorate([
    (0, common_1.Delete)('/creneau/:idCreneau'),
    __param(0, (0, common_1.Param)('idCreneau')),
    __param(1, (0, decorators_1.GetUser)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], AgendaController.prototype, "deleteCreneau", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, swagger_1.ApiOperation)({
        summary: 'update user agenda',
    }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, decorators_1.GetUser)('id')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, agenda_request_dto_1.UpdateAgendaDto]),
    __metadata("design:returntype", Promise)
], AgendaController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, decorators_1.GetUser)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], AgendaController.prototype, "delete", null);
exports.AgendaController = AgendaController = __decorate([
    (0, swagger_1.ApiTags)('Agenda'),
    (0, common_1.Controller)('agendas'),
    __param(0, (0, mongoose_1.InjectModel)(main_database_connection_1.CRENEAU_MODEL_NAME, main_database_connection_1.DATABASE_CONNECTION)),
    __metadata("design:paramtypes", [Object, providers_1.AgendaService, Database.UsersService])
], AgendaController);
//# sourceMappingURL=agenda.controller.js.map