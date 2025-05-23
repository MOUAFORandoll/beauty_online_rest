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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProfileService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const entities_1 = require("../../../databases/users/entities");
const errors_1 = require("../errors");
const main_database_connection_1 = require("../../../databases/main.database.connection");
const providers_1 = require("../../../common/modules/aws/providers");
const action_shareable_1 = require("../../../common/ClassActions/action.shareable");
const config_1 = require("@nestjs/config");
let ProfileService = class ProfileService {
    constructor(positionModel, profileModel, storageService, configService) {
        this.positionModel = positionModel;
        this.profileModel = profileModel;
        this.storageService = storageService;
        this.configService = configService;
        this.self = this;
    }
    async create(dto, user_id) {
        try {
            console.log('=========');
            const profile = new this.profileModel({
                namePro: dto.namePro,
                description: dto.description,
                service: dto.service,
                user_id: user_id,
            });
            console.log('===ddd======');
            if (dto.cover) {
                profile.cover = await this.storageService.uploadCoverImage(dto.cover, profile._id.toString());
            }
            await profile.save();
            await this.updateProfilePosition(profile.id, {
                longitude: dto.longitude,
                latitude: dto.latitude,
                town: '',
                country: '',
                titleEmplacement: dto.titleEmplacement,
            });
            return this.findOneById(profile.id);
        }
        catch (error) {
            throw new Error(`Failed to create profile: ${error.message}`);
        }
    }
    async findOneById(id) {
        const profile = await this.profileModel.findById(id).exec();
        if (!profile) {
            throw new common_1.HttpException(errors_1.ProfileProErrors[errors_1.PROFILE_PRO_NOT_FOUND], 203);
        }
        return profile;
    }
    async findUserProfile(userId) {
        const profile = await this.profileModel.findOne({ user_id: userId }).exec();
        if (!profile) {
            throw new common_1.BadRequestException(errors_1.ProfileProErrors[errors_1.PROFILE_PRO_NOT_FOUND]);
        }
        return profile;
    }
    async findProfileByFilter(filterService, pagination) {
        const [data, total] = await Promise.all([
            this.profileModel
                .find(filterService)
                .skip((pagination.page - 1) * pagination.size)
                .limit(pagination.size)
                .exec(),
            this.profileModel.countDocuments(filterService).exec(),
        ]);
        return { data, total };
    }
    async findByProximity(longitude, latitude, pagination) {
        const [data, total] = await Promise.all([
            this.profileModel
                .find()
                .skip((pagination.page - 1) * pagination.size)
                .limit(pagination.size)
                .exec(),
            this.profileModel.countDocuments().exec(),
        ]);
        return { data, total };
    }
    async findAll(pagination) {
        const [data, total] = await Promise.all([
            this.profileModel
                .find()
                .skip((pagination.page - 1) * pagination.size)
                .limit(pagination.size)
                .exec(),
            this.profileModel.countDocuments().exec(),
        ]);
        return { data, total };
    }
    async update(id, dto) {
        const profile = await this.findOneById(id);
        console.log(dto);
        if (dto.name_pro)
            profile.namePro = dto.name_pro;
        if (dto.description)
            profile.description = dto.description;
        return profile.save();
    }
    async delete(id) {
        const result = await this.profileModel.findByIdAndDelete(id).exec();
        if (!result) {
            throw new common_1.NotFoundException(errors_1.ProfileProErrors[errors_1.PROFILE_PRO_NOT_FOUND]);
        }
        return { deleted: true, message: 'Profile successfully deleted' };
    }
    async updateProfilePosition(profile_professionnel_id, dto) {
        const position = new this.positionModel({
            ...dto,
            profile_professionnel_id: profile_professionnel_id,
        });
        await position.save();
    }
    async updateProfileCover(photo, id) {
        try {
            const profile = await this.profileModel.findById(id).exec();
            if (!profile) {
                throw new common_1.BadRequestException(errors_1.ProfileProErrors[errors_1.PROFILE_PRO_NOT_FOUND]);
            }
            console.log(photo);
            console.log(id);
            if (photo) {
                profile.cover = await this.storageService.uploadCoverImage(photo, profile._id.toString());
            }
            return profile.save();
        }
        catch (error) {
            throw new Error(`Failed to create profile: ${error.message}`);
        }
    }
    shareProfile(profileId) {
        return this.self.share(profileId.toString());
    }
};
exports.ProfileService = ProfileService;
exports.ProfileService = ProfileService = __decorate([
    (0, common_1.Injectable)(),
    (0, action_shareable_1.Shareable)({
        sharePath: 'professionnel',
    }),
    __param(0, (0, mongoose_1.InjectModel)(entities_1.POSITION_MODEL_NAME, main_database_connection_1.DATABASE_CONNECTION)),
    __param(1, (0, mongoose_1.InjectModel)(entities_1.PROFILE_PRO_MODEL_NAME, main_database_connection_1.DATABASE_CONNECTION)),
    __metadata("design:paramtypes", [Object, Object, providers_1.StorageService,
        config_1.ConfigService])
], ProfileService);
//# sourceMappingURL=profile.service.js.map