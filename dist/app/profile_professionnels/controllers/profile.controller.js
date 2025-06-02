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
exports.ProfileController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const dto_1 = require("../dto");
const providers_1 = require("../providers");
const decorators_1 = require("../../users/decorators");
const Database = __importStar(require("../../../databases/users/providers"));
const apiutils_1 = require("../../../common/apiutils");
const dto_2 = require("../../users/dto");
const mongoose_1 = require("@nestjs/mongoose");
const entities_1 = require("../../../databases/users/entities");
const main_database_connection_1 = require("../../../databases/main.database.connection");
const platform_express_1 = require("@nestjs/platform-express");
const response_dto_1 = require("../../../common/ClassActions/response.dto");
let ProfileController = class ProfileController {
    constructor(profileService, agendaModel, positionModel, realisationModel, rendezVousModel, dbUsersService) {
        this.profileService = profileService;
        this.agendaModel = agendaModel;
        this.positionModel = positionModel;
        this.realisationModel = realisationModel;
        this.rendezVousModel = rendezVousModel;
        this.dbUsersService = dbUsersService;
    }
    async create(id, dto, cover) {
        dto.cover = cover;
        await this.dbUsersService.getUser(id);
        const profile = await this.profileService.create(dto, id);
        return dto_1.ProfileResponseDto.fromProfile(profile, this.agendaModel, this.positionModel, this.realisationModel, this.rendezVousModel);
    }
    async findUserProfile(idUser) {
        const profile = await this.profileService.findUserProfile(idUser);
        return dto_1.ProfileResponseDto.fromProfile(profile, this.agendaModel, this.positionModel, this.realisationModel, this.rendezVousModel);
    }
    async findProfileByService(filterService, pagination) {
        const { data, total } = await this.profileService.findProfileByFilter(filterService, pagination);
        return apiutils_1.PaginationResponseDto.responseDto(pagination, data, total).mapPromise((profile) => dto_1.ProfileResponseDto.fromProfile(profile, this.agendaModel, this.positionModel, this.realisationModel, this.rendezVousModel));
    }
    async findOneById(id) {
        const profile = await this.profileService.findOneById(id);
        return dto_1.ProfileResponseDto.fromProfile(profile, this.agendaModel, this.positionModel, this.realisationModel, this.rendezVousModel);
    }
    async findAll(pagination) {
        const { data, total } = await this.profileService.findAll(pagination);
        return apiutils_1.PaginationResponseDto.responseDto(pagination, data, total).mapPromise((profile) => dto_1.ProfileResponseDto.fromProfile(profile, this.agendaModel, this.positionModel, this.realisationModel, this.rendezVousModel));
    }
    async findByProximity(longitude, latitude, pagination) {
        const { data, total } = await this.profileService.findByProximity(longitude, latitude, pagination);
        return apiutils_1.PaginationResponseDto.responseDto(pagination, data, total).mapPromise((profile) => dto_1.ProfileResponseDto.fromProfile(profile, this.agendaModel, this.positionModel, this.realisationModel, this.rendezVousModel));
    }
    async update(idUser, dto) {
        await this.dbUsersService.getUser(idUser);
        let profile = await this.profileService.findUserProfile(idUser);
        profile = await this.profileService.update(profile._id.toString(), dto);
        return dto_1.ProfileResponseDto.fromProfile(profile, this.agendaModel, this.positionModel, this.realisationModel, this.rendezVousModel);
    }
    async updateProfileCover(id, image) {
        let profile = await this.profileService.findUserProfile(id);
        profile = await this.profileService.updateProfileCover(image, profile._id.toString());
        return dto_1.ProfileResponseDto.fromProfile(profile, this.agendaModel, this.positionModel, this.realisationModel, this.rendezVousModel);
    }
    async updateUserPosition(id, payload) {
        await this.profileService.updateProfilePosition(id, payload);
    }
    async delete(id, idUser) {
        await this.dbUsersService.getUser(idUser);
        await this.profileService.delete(id);
    }
    shareProfile(actuId) {
        const shareLink = this.profileService.shareProfile(actuId);
        return { shareLink };
    }
};
exports.ProfileController = ProfileController;
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({
        summary: 'create user profile',
    }),
    (0, swagger_1.ApiConsumes)('multipart/form-data'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('cover')),
    (0, swagger_1.ApiOkResponse)({ type: dto_1.ProfileResponseDto }),
    __param(0, (0, decorators_1.GetUser)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, dto_1.CreateProfileDto, Object]),
    __metadata("design:returntype", Promise)
], ProfileController.prototype, "create", null);
__decorate([
    (0, common_1.Get)('/me'),
    (0, swagger_1.ApiOperation)({
        summary: 'Find user profile',
    }),
    (0, swagger_1.ApiOkResponse)({ type: dto_1.ProfileResponseDto }),
    __param(0, (0, decorators_1.GetUser)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ProfileController.prototype, "findUserProfile", null);
__decorate([
    (0, common_1.Get)('/filter'),
    (0, swagger_1.ApiOperation)({
        summary: 'filter profile ',
    }),
    (0, apiutils_1.Public)(),
    (0, swagger_1.ApiOkResponse)({ type: (apiutils_1.PaginationResponseDto) }),
    __param(0, (0, common_1.Query)()),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.FindByServiceDto,
        apiutils_1.PaginationPayloadDto]),
    __metadata("design:returntype", Promise)
], ProfileController.prototype, "findProfileByService", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({
        summary: 'Find profile by id',
    }),
    (0, swagger_1.ApiOkResponse)({ type: dto_1.ProfileResponseDto }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ProfileController.prototype, "findOneById", null);
__decorate([
    (0, common_1.Get)(''),
    (0, swagger_1.ApiOperation)({
        summary: 'Find All profile',
    }),
    (0, apiutils_1.Public)(),
    (0, swagger_1.ApiOkResponse)({ type: (apiutils_1.PaginationResponseDto) }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [apiutils_1.PaginationPayloadDto]),
    __metadata("design:returntype", Promise)
], ProfileController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('proximity'),
    (0, swagger_1.ApiOperation)({
        summary: 'Find All profile',
    }),
    (0, apiutils_1.Public)(),
    (0, swagger_1.ApiOkResponse)({ type: (apiutils_1.PaginationResponseDto) }),
    __param(0, (0, common_1.Param)('longitude')),
    __param(1, (0, common_1.Param)('latitude')),
    __param(2, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, apiutils_1.PaginationPayloadDto]),
    __metadata("design:returntype", Promise)
], ProfileController.prototype, "findByProximity", null);
__decorate([
    (0, common_1.Patch)(''),
    (0, swagger_1.ApiOperation)({
        summary: 'update user profile',
    }),
    (0, swagger_1.ApiOkResponse)({ type: dto_1.ProfileResponseDto }),
    __param(0, (0, decorators_1.GetUser)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, dto_1.UpdateProfileDto]),
    __metadata("design:returntype", Promise)
], ProfileController.prototype, "update", null);
__decorate([
    (0, common_1.Patch)('/cover'),
    (0, swagger_1.ApiOperation)({
        summary: 'create user profile',
    }),
    (0, swagger_1.ApiConsumes)('multipart/form-data'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('image')),
    (0, swagger_1.ApiOkResponse)({ type: dto_1.ProfileResponseDto }),
    __param(0, (0, decorators_1.GetUser)('id')),
    __param(1, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], ProfileController.prototype, "updateProfileCover", null);
__decorate([
    (0, common_1.Patch)('/:id/update-position'),
    (0, swagger_1.ApiOperation)({
        summary: 'Update user position',
    }),
    (0, swagger_1.ApiOkResponse)(),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, dto_2.UpdateUserPositionDto]),
    __metadata("design:returntype", Promise)
], ProfileController.prototype, "updateUserPosition", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, decorators_1.GetUser)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], ProfileController.prototype, "delete", null);
__decorate([
    (0, common_1.Get)(':id/share'),
    (0, swagger_1.ApiOkResponse)({ type: response_dto_1.ShareLink }),
    (0, apiutils_1.Public)(),
    (0, swagger_1.ApiOperation)({
        summary: 'Profile share link',
    }),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", response_dto_1.ShareLink)
], ProfileController.prototype, "shareProfile", null);
exports.ProfileController = ProfileController = __decorate([
    (0, swagger_1.ApiTags)('ProfileProfessionnels'),
    (0, common_1.Controller)('profile-professionnels'),
    __param(1, (0, mongoose_1.InjectModel)(main_database_connection_1.AGENDA_MODEL_NAME, main_database_connection_1.DATABASE_CONNECTION)),
    __param(2, (0, mongoose_1.InjectModel)(entities_1.POSITION_MODEL_NAME, main_database_connection_1.DATABASE_CONNECTION)),
    __param(3, (0, mongoose_1.InjectModel)(main_database_connection_1.REALISATION_MODEL_NAME, main_database_connection_1.DATABASE_CONNECTION)),
    __param(4, (0, mongoose_1.InjectModel)(main_database_connection_1.RENDEZ_VOUS_MODEL_NAME, main_database_connection_1.DATABASE_CONNECTION)),
    __metadata("design:paramtypes", [providers_1.ProfileService, Object, Object, Object, Object, Database.UsersService])
], ProfileController);
//# sourceMappingURL=profile.controller.js.map