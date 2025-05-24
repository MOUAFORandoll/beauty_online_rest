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
var StorageService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.StorageService = void 0;
const path_1 = __importDefault(require("path"));
const common_1 = require("@nestjs/common");
const client_s3_1 = require("@aws-sdk/client-s3");
const config_1 = require("@nestjs/config");
let StorageService = StorageService_1 = class StorageService {
    constructor(configService) {
        this.configService = configService;
        this.bucket = this.configService.get('AWS_BUCKET');
        this.cloudfrontUrl = this.configService.get('AWS_CLOUDFRONT_URL');
        this.s3Client = new client_s3_1.S3Client({
            credentials: {
                accessKeyId: this.configService.get('AWS_ACCESS_KEY_ID'),
                secretAccessKey: this.configService.get('AWS_ACCESS_KEY_SECRET'),
            },
            region: this.configService.get('AWS_REGION'),
        });
    }
    getUrl(path, key, height, width) {
        const params = {
            bucket: this.bucket,
            key: path_1.default.join(path, key),
            edits: {
                resize: {
                    fit: 'cover',
                },
            },
        };
        if (height)
            params.edits.resize['height'] = height;
        if (width)
            params.edits.resize['width'] = width;
        return (this.cloudfrontUrl +
            `${this.cloudfrontUrl.endsWith('/') ? '' : '/'}` +
            btoa(JSON.stringify(params)));
    }
    getKey(url) {
        const data = url.substring(url.lastIndexOf('/') + 1);
        const decrypted = JSON.parse(atob(data));
        const fullKey = decrypted['key'];
        return fullKey.substring(fullKey.lastIndexOf('/') + 1);
    }
    async upload(path, key, media) {
        const command = new client_s3_1.PutObjectCommand({
            Bucket: this.bucket,
            Key: path_1.default.join(path, key),
            Body: media.buffer,
            ContentType: media.mimetype,
        });
        await this.s3Client.send(command);
    }
    async uploadBuffer(path, key, media) {
        const command = new client_s3_1.PutObjectCommand({
            Bucket: this.bucket,
            Key: path_1.default.join(path, key),
            Body: media,
        });
        await this.s3Client.send(command);
    }
    async uploadCoverImage(image, key) {
        try {
            const uploadKey = key + Date.now().toString();
            await this.upload(StorageService_1.professionalCoverPath, uploadKey, image);
            return this.getUrl(StorageService_1.professionalCoverPath, uploadKey, 600, 600);
        }
        catch (error) {
            console.error('Error uploading cover image:', error);
            throw error;
        }
    }
    async userProfilePath(image, key) {
        try {
            const uploadKey = key + Date.now().toString();
            console.log('=========', key, StorageService_1.userProfilePath);
            await this.upload(StorageService_1.userProfilePath, uploadKey, image);
            return this.getUrl(StorageService_1.userProfilePath, uploadKey, 600, 600);
        }
        catch (error) {
            console.log('=========', error);
        }
    }
    async uploadRealisationImage(image, key) {
        try {
            const uploadKey = key + Date.now().toString();
            await this.upload(StorageService_1.professionalRealisationPath, uploadKey, image);
            return this.getUrl(StorageService_1.professionalRealisationPath, uploadKey, 600, 600);
        }
        catch (error) {
            console.log('=========', error);
        }
    }
};
exports.StorageService = StorageService;
StorageService.userProfilePath = 'users/profile';
StorageService.professionalCoverPath = 'professional/cover';
StorageService.professionalRealisationPath = 'professional/realisation';
exports.StorageService = StorageService = StorageService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], StorageService);
//# sourceMappingURL=storage.service.js.map