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
exports.RealisationController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const dto_1 = require("../dto");
const providers_1 = require("../providers");
const decorators_1 = require("../../users/decorators");
const Database = __importStar(require("../../../databases/users/providers"));
const apiutils_1 = require("../../../common/apiutils");
const realisation_request_dto_1 = require("../dto/realisation.request.dto");
const platform_express_1 = require("@nestjs/platform-express");
const entities_1 = require("../../../databases/services/entities");
const main_database_connection_1 = require("../../../databases/main.database.connection");
const mongoose_1 = require("@nestjs/mongoose");
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
const multer_1 = require("multer");
const config_1 = require("@nestjs/config");
let RealisationController = class RealisationController {
    constructor(realisationFileModel, realisationVideoModel, realisationService, dbUsersService, configService) {
        this.realisationFileModel = realisationFileModel;
        this.realisationVideoModel = realisationVideoModel;
        this.realisationService = realisationService;
        this.dbUsersService = dbUsersService;
        this.configService = configService;
        this.localDirectory = path.join(__dirname, '../../../../assets/upload');
    }
    async createWithImage(id, dto, files) {
        dto.files = files;
        await this.dbUsersService.getUser(id);
        const profile = await this.realisationService.createWithImages(dto, id);
        return dto_1.RealisationResponseDto.fromRealisation(profile, this.realisationFileModel, this.realisationVideoModel, this.configService);
    }
    async createWithVideo(id, dto, file) {
        dto.file = file;
        await this.dbUsersService.getUser(id);
        const profile = await this.realisationService.createWithVideo(dto, id);
        return dto_1.RealisationResponseDto.fromRealisation(profile, this.realisationFileModel, this.realisationVideoModel, this.configService);
    }
    async fakeData() {
        const titles = [
            'Nattes collées',
            'Vanilles',
            'Tresses africaines',
            'Chignon',
            'Coupe dégradée',
            'Tissage',
            'Perruque lace',
            'Crochet braids',
            'Coiffure protectrice',
            'Locks',
            'Twists',
            'Braids',
            'Fulani braids',
        ];
        const allImageFiles = fs
            .readdirSync(this.localDirectory)
            .filter((file) => fs.statSync(path.join(this.localDirectory, file)).isFile());
        const userId = '683e0f897e9608524988a4e9';
        const realisations = [];
        const getRandomFromArray = (arr, count) => [...arr].sort(() => 0.5 - Math.random()).slice(0, count);
        const getRandomPrice = () => Math.floor(Math.random() * 30 + 20).toString();
        for (let i = 0; i < 50; i++) {
            const selectedImages = getRandomFromArray(allImageFiles, 3);
            const filesBuffer = selectedImages.map((fileName) => {
                const filePath = path.join(this.localDirectory, fileName);
                const buffer = fs.readFileSync(filePath);
                return {
                    fieldname: 'files',
                    originalname: fileName,
                    encoding: '7bit',
                    mimetype: 'image/jpeg',
                    buffer,
                    size: buffer.length,
                };
            });
            const dto = {
                title: titles[Math.floor(Math.random() * titles.length)],
                price: getRandomPrice(),
                files: filesBuffer,
                isVideo: false,
            };
            const realisation = await this.realisationService.createWithImages(dto, userId);
            const responseDto = await dto_1.RealisationResponseDto.fromRealisation(realisation, this.realisationFileModel, this.realisationVideoModel, this.configService);
            realisations.push(responseDto);
        }
        return realisations;
    }
    async findUserRealisation(idUser, pagination) {
        const { data, total } = await this.realisationService.findUserRealisation(idUser, pagination);
        return apiutils_1.PaginationResponseDto.responseDto(pagination, data, total).mapPromise((l) => dto_1.RealisationResponseDto.fromRealisation(l, this.realisationFileModel, this.realisationVideoModel, this.configService));
    }
    async findProRealisation(idProfessionnel, pagination) {
        const { data, total } = await this.realisationService.findProfessionalRealisation(idProfessionnel, pagination);
        return apiutils_1.PaginationResponseDto.responseDto(pagination, data, total).mapPromise((l) => dto_1.RealisationResponseDto.fromRealisation(l, this.realisationFileModel, this.realisationVideoModel, this.configService));
    }
    async findRealisationFilter(filter, pagination) {
        const { data, total } = await this.realisationService.findRealisationFilter(filter, pagination);
        return apiutils_1.PaginationResponseDto.responseDto(pagination, data, total).mapPromise((l) => dto_1.RealisationResponseDto.fromRealisation(l, this.realisationFileModel, this.realisationVideoModel, this.configService));
    }
    async findAll(pagination) {
        const { data, total } = await this.realisationService.findAll(pagination);
        return apiutils_1.PaginationResponseDto.responseDto(pagination, data, total).mapPromise((l) => dto_1.RealisationResponseDto.fromRealisation(l, this.realisationFileModel, this.realisationVideoModel, this.configService));
    }
    async update(id, idUser, dto) {
        await this.dbUsersService.getUser(idUser);
        const profile = await this.realisationService.update(id, dto);
        return dto_1.RealisationResponseDto.fromRealisation(profile, this.realisationFileModel, this.realisationVideoModel, this.configService);
    }
    async delete(id, idUser) {
        await this.dbUsersService.getUser(idUser);
        await this.realisationService.delete(id);
    }
};
exports.RealisationController = RealisationController;
__decorate([
    (0, common_1.Post)('/with-image'),
    (0, swagger_1.ApiOperation)({
        summary: 'create realisation profile',
    }),
    (0, swagger_1.ApiConsumes)('multipart/form-data'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FilesInterceptor)('files[]')),
    (0, swagger_1.ApiOkResponse)({ type: dto_1.RealisationResponseDto }),
    __param(0, (0, decorators_1.GetUser)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.UploadedFiles)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, realisation_request_dto_1.CreateRealisationDto,
        Array]),
    __metadata("design:returntype", Promise)
], RealisationController.prototype, "createWithImage", null);
__decorate([
    (0, common_1.Post)('/with-video'),
    (0, swagger_1.ApiOperation)({
        summary: 'create realisation profile',
    }),
    (0, swagger_1.ApiConsumes)('multipart/form-data'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('file', {
        storage: (0, multer_1.diskStorage)({
            destination: './assets/videos',
            filename: (req, file, cb) => {
                console.log(`${Date.now()}-${file.originalname}`);
                cb(null, `${Date.now()}-${file.originalname}`);
            },
        }),
    })),
    (0, swagger_1.ApiOkResponse)({ type: dto_1.RealisationResponseDto }),
    __param(0, (0, decorators_1.GetUser)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, realisation_request_dto_1.CreateRealisationVideoDto, Object]),
    __metadata("design:returntype", Promise)
], RealisationController.prototype, "createWithVideo", null);
__decorate([
    (0, common_1.Get)('/fake-data'),
    (0, swagger_1.ApiOperation)({
        summary: 'Create fake realisations for a test profile',
    }),
    (0, apiutils_1.Public)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], RealisationController.prototype, "fakeData", null);
__decorate([
    (0, common_1.Get)('/me'),
    (0, swagger_1.ApiOperation)({
        summary: 'Find user profile',
    }),
    __param(0, (0, decorators_1.GetUser)('id')),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, apiutils_1.PaginationPayloadDto]),
    __metadata("design:returntype", Promise)
], RealisationController.prototype, "findUserRealisation", null);
__decorate([
    (0, common_1.Get)('/professional/:idProfessionnel'),
    (0, swagger_1.ApiOperation)({
        summary: 'Find user profile',
    }),
    __param(0, (0, common_1.Param)('idProfessionnel')),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, apiutils_1.PaginationPayloadDto]),
    __metadata("design:returntype", Promise)
], RealisationController.prototype, "findProRealisation", null);
__decorate([
    (0, common_1.Get)('/filter'),
    (0, swagger_1.ApiOperation)({
        summary: 'filter profile ',
    }),
    (0, apiutils_1.Public)(),
    __param(0, (0, common_1.Query)()),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [realisation_request_dto_1.FindRealisationDto,
        apiutils_1.PaginationPayloadDto]),
    __metadata("design:returntype", Promise)
], RealisationController.prototype, "findRealisationFilter", null);
__decorate([
    (0, common_1.Get)(''),
    (0, swagger_1.ApiOperation)({
        summary: 'Find All profile',
    }),
    (0, apiutils_1.Public)(),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [apiutils_1.PaginationPayloadDto]),
    __metadata("design:returntype", Promise)
], RealisationController.prototype, "findAll", null);
__decorate([
    (0, common_1.Put)(':id'),
    (0, swagger_1.ApiOperation)({
        summary: 'update user profile',
    }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, decorators_1.GetUser)('id')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, realisation_request_dto_1.UpdateRealisationDto]),
    __metadata("design:returntype", Promise)
], RealisationController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, decorators_1.GetUser)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], RealisationController.prototype, "delete", null);
exports.RealisationController = RealisationController = __decorate([
    (0, swagger_1.ApiTags)('Realisations'),
    (0, common_1.Controller)('realisations'),
    __param(0, (0, mongoose_1.InjectModel)(entities_1.REALISATION_FILE_MODEL_NAME, main_database_connection_1.DATABASE_CONNECTION)),
    __param(1, (0, mongoose_1.InjectModel)(entities_1.REALISATION_VIDEO_MODEL_NAME, main_database_connection_1.DATABASE_CONNECTION)),
    __metadata("design:paramtypes", [Object, Object, providers_1.RealisationService, Database.UsersService, config_1.ConfigService])
], RealisationController);
//# sourceMappingURL=realisation.controller.js.map