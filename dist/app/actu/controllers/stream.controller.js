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
exports.StreamController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const providers_1 = require("../providers");
const apiutils_1 = require("../../../common/apiutils");
const entities_1 = require("../../../databases/services/entities");
const main_database_connection_1 = require("../../../databases/main.database.connection");
const mongoose_1 = require("@nestjs/mongoose");
const providers_2 = require("../../profile_professionnels/providers");
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
const crypto = __importStar(require("crypto"));
const config_1 = require("@nestjs/config");
let StreamController = class StreamController {
    constructor(actuService, realisationModel, realisationVideoModel, rendezVousModel, vueModel, shareModel, likeModel, profileService, configService) {
        this.actuService = actuService;
        this.realisationModel = realisationModel;
        this.realisationVideoModel = realisationVideoModel;
        this.rendezVousModel = rendezVousModel;
        this.vueModel = vueModel;
        this.shareModel = shareModel;
        this.likeModel = likeModel;
        this.profileService = profileService;
        this.configService = configService;
    }
    async stream(id, req, res) {
        try {
            if (!id || id.trim() === '') {
                throw new common_1.BadRequestException('ID invalide');
            }
            const video = await this.actuService.findOneRealisationVideoById(id);
            if (!video) {
                throw new common_1.NotFoundException('Vidéo non trouvée');
            }
            const sanitizedPath = path.normalize(video.video_path).replace(/^(\.\.[/\\])+/, '');
            const filePath = path.join('./assets/videos', sanitizedPath);
            let fileStats;
            try {
                fileStats = await fs.promises.stat(filePath);
            }
            catch (error) {
                console.log(`Fichier non trouvé: ${filePath}`, error);
                throw new common_1.NotFoundException('Fichier vidéo non trouvé');
            }
            const etag = crypto
                .createHash('md5')
                .update(`${fileStats.size}-${fileStats.mtime.getTime()}`)
                .digest('hex');
            const ifNoneMatch = req.headers['if-none-match'];
            if (ifNoneMatch === etag) {
                return res.status(common_1.HttpStatus.NOT_MODIFIED).end();
            }
            const baseHeaders = {
                'Content-Type': 'video/mp4',
                'Accept-Ranges': 'bytes',
                'Cache-Control': 'public, max-age=3600',
                ETag: etag,
                'Last-Modified': fileStats.mtime.toUTCString(),
                'Access-Control-Allow-Origin': process.env.ALLOWED_ORIGINS || '*',
                'Access-Control-Allow-Headers': 'Range, If-None-Match',
                'Access-Control-Expose-Headers': 'Content-Range, Content-Length',
            };
            console.log('baseHeaders=========', baseHeaders);
            const range = req.headers.range;
            console.log('range=========', range);
            if (range) {
                this.handleRangeRequest(res, filePath, fileStats, range, baseHeaders);
            }
            else {
                this.handleFullFileStream(res, filePath, fileStats, baseHeaders);
            }
        }
        catch (error) {
            console.log('Erreur lors du streaming:', error);
            if (!res.headersSent) {
                if (error instanceof common_1.BadRequestException || error instanceof common_1.NotFoundException) {
                    return res.status(error.getStatus()).json({
                        success: false,
                        error: error.message,
                    });
                }
                return res.status(common_1.HttpStatus.INTERNAL_SERVER_ERROR).json({
                    success: false,
                    error: 'Erreur lors du streaming',
                    details: process.env.NODE_ENV !== 'production' ? error.message : undefined,
                });
            }
        }
    }
    handleRangeRequest(res, filePath, fileStats, range, baseHeaders) {
        const parts = range.replace(/bytes=/, '').split('-');
        const start = parseInt(parts[0], 10);
        const end = parts[1] ? parseInt(parts[1], 10) : fileStats.size - 1;
        if (isNaN(start) || isNaN(end) || start < 0 || end >= fileStats.size || start > end) {
            console.log(`Range invalide: ${range} pour fichier de taille ${fileStats.size}`);
            return res
                .status(common_1.HttpStatus.REQUESTED_RANGE_NOT_SATISFIABLE)
                .set('Content-Range', `bytes */${fileStats.size}`)
                .json({
                success: false,
                error: 'Range non satisfiable',
            });
        }
        const chunkSize = end - start + 1;
        const rangeHeaders = {
            ...baseHeaders,
            'Content-Range': `bytes ${start}-${end}/${fileStats.size}`,
            'Content-Length': chunkSize.toString(),
        };
        res.writeHead(common_1.HttpStatus.PARTIAL_CONTENT, rangeHeaders);
        const fileStream = fs.createReadStream(filePath, { start, end });
        fileStream.on('error', (error) => {
            console.log('Erreur stream fichier (range):', error);
            if (!res.destroyed) {
                res.destroy();
            }
        });
        fileStream.on('end', () => {
            console.log(`Stream range terminé: ${start}-${end}`);
        });
        fileStream.pipe(res);
    }
    handleFullFileStream(res, filePath, fileStats, baseHeaders) {
        const fullHeaders = {
            ...baseHeaders,
            'Content-Length': fileStats.size.toString(),
        };
        res.writeHead(common_1.HttpStatus.OK, fullHeaders);
        const fileStream = fs.createReadStream(filePath);
        fileStream.on('error', (error) => {
            console.log('Erreur stream fichier complet:', error);
            if (!res.destroyed) {
                res.destroy();
            }
        });
        fileStream.on('end', () => {
            console.log('Stream complet terminé');
        });
        fileStream.pipe(res);
    }
};
exports.StreamController = StreamController;
__decorate([
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, common_1.Get)(':id'),
    (0, apiutils_1.Public)(),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Req)()),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, Object]),
    __metadata("design:returntype", Promise)
], StreamController.prototype, "stream", null);
exports.StreamController = StreamController = __decorate([
    (0, swagger_1.ApiTags)('Stream'),
    (0, common_1.Controller)('stream'),
    __param(1, (0, mongoose_1.InjectModel)(entities_1.REALISATION_MODEL_NAME, main_database_connection_1.DATABASE_CONNECTION)),
    __param(2, (0, mongoose_1.InjectModel)(entities_1.REALISATION_VIDEO_MODEL_NAME, main_database_connection_1.DATABASE_CONNECTION)),
    __param(3, (0, mongoose_1.InjectModel)(entities_1.RENDEZ_VOUS_MODEL_NAME, main_database_connection_1.DATABASE_CONNECTION)),
    __param(4, (0, mongoose_1.InjectModel)(entities_1.VUE_REALISATION_MODEL_NAME, main_database_connection_1.DATABASE_CONNECTION)),
    __param(5, (0, mongoose_1.InjectModel)(entities_1.SHARE_REALISATION_MODEL_NAME, main_database_connection_1.DATABASE_CONNECTION)),
    __param(6, (0, mongoose_1.InjectModel)(entities_1.LIKE_REALISATION_MODEL_NAME, main_database_connection_1.DATABASE_CONNECTION)),
    __metadata("design:paramtypes", [providers_1.ActuService, Object, Object, Object, Object, Object, Object, providers_2.ProfileService,
        config_1.ConfigService])
], StreamController);
//# sourceMappingURL=stream.controller.js.map