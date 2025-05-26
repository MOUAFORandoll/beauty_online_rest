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
exports.RealisationService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const main_database_connection_1 = require("../../../databases/main.database.connection");
const mongoose_2 = require("mongoose");
const errors_1 = require("../errors");
const profile_service_1 = require("./profile.service");
const providers_1 = require("../../../common/modules/aws/providers");
let RealisationService = class RealisationService {
    constructor(realisationModel, realisationFileModel, profileService, storageService) {
        this.realisationModel = realisationModel;
        this.realisationFileModel = realisationFileModel;
        this.profileService = profileService;
        this.storageService = storageService;
    }
    async create(dto, user_id) {
        if (!dto.images || !dto.images.length) {
            throw new common_1.BadRequestException('At least one image is required');
        }
        const session = await this.realisationModel.db.startSession();
        session.startTransaction();
        try {
            const profilePro = await this.profileService.findUserProfile(user_id);
            if (!profilePro) {
                throw new common_1.NotFoundException(errors_1.ProfileProErrors[errors_1.PROFILE_PRO_NOT_FOUND]);
            }
            const realisation = new this.realisationModel({
                ...dto,
                profile_professionnel_id: profilePro._id,
            });
            await realisation.save({ session });
            const savedFiles = [];
            for (const image of dto.images) {
                try {
                    const realisationFile = new this.realisationFileModel({
                        image,
                        realisation_id: realisation._id,
                    });
                    realisationFile.file_path = await this.storageService.uploadRealisationImage(image, realisationFile._id.toString());
                    await realisationFile.save({ session });
                    savedFiles.push(realisationFile);
                }
                catch (error) {
                    console.error(`Failed to upload image: ${error.message}`, error.stack);
                    throw new Error(`Failed to upload image: ${error.message}`);
                }
            }
            await session.commitTransaction();
            await session.endSession();
            return this.findById(realisation._id.toString());
        }
        catch (error) {
            await session.abortTransaction();
            await session.endSession();
            console.error(`Failed to create realisation: ${error.message}`, error.stack);
            if (error instanceof common_1.NotFoundException || error instanceof common_1.BadRequestException) {
                throw error;
            }
            throw new Error(`Failed to create realisation: ${error.message}`);
        }
    }
    async findById(id) {
        if (!mongoose_2.Types.ObjectId.isValid(id)) {
            throw new common_1.BadRequestException('Invalid realisation ID');
        }
        const realisation = await this.realisationModel.findById(id).exec();
        if (!realisation) {
            throw new common_1.NotFoundException(errors_1.RealisationErrors[errors_1.REALISATION_NOT_FOUND]);
        }
        return realisation;
    }
    async findUserRealisation(idUser, pagination) {
        const profilePro = await this.profileService.findUserProfile(idUser);
        if (!profilePro) {
            throw new common_1.NotFoundException(errors_1.ProfileProErrors[errors_1.PROFILE_PRO_NOT_FOUND]);
        }
        const [data, total] = await Promise.all([
            this.realisationModel
                .find({ profile_professionnel_id: profilePro._id })
                .sort({ createdAt: -1 })
                .skip((pagination.page - 1) * pagination.size)
                .limit(pagination.size)
                .exec(),
            this.realisationModel
                .countDocuments({ profile_professionnel_id: profilePro._id })
                .exec(),
        ]);
        return { data, total };
    }
    async findProfessionalRealisation(idProfessionnel, pagination) {
        const [data, total] = await Promise.all([
            this.realisationModel
                .find({ profile_professionnel_id: idProfessionnel })
                .sort({ createdAt: -1 })
                .skip((pagination.page - 1) * pagination.size)
                .limit(pagination.size)
                .exec(),
            this.realisationModel
                .countDocuments({ profile_professionnel_id: idProfessionnel })
                .exec(),
        ]);
        return { data, total };
    }
    async findRealisationFilter(filter, pagination) {
        const safeFilter = this.sanitizeFilter(filter);
        const [data, total] = await Promise.all([
            this.realisationModel
                .find(safeFilter)
                .sort({ createdAt: -1 })
                .skip((pagination.page - 1) * pagination.size)
                .limit(pagination.size)
                .exec(),
            this.realisationModel.countDocuments(safeFilter).exec(),
        ]);
        return { data, total };
    }
    async findAll(pagination) {
        const [data, total] = await Promise.all([
            this.realisationModel
                .find()
                .sort({ createdAt: -1 })
                .skip((pagination.page - 1) * pagination.size)
                .limit(pagination.size)
                .exec(),
            this.realisationModel.countDocuments().exec(),
        ]);
        return { data, total };
    }
    async update(id, dto, options = { new: true }) {
        if (!mongoose_2.Types.ObjectId.isValid(id)) {
            throw new common_1.BadRequestException('Invalid realisation ID');
        }
        const existingRealisation = await this.realisationModel.findById(id).exec();
        if (!existingRealisation) {
            throw new common_1.NotFoundException(errors_1.RealisationErrors[errors_1.REALISATION_NOT_FOUND]);
        }
        const updatedRealisation = await this.realisationModel
            .findByIdAndUpdate(id, dto, options)
            .exec();
        if (!updatedRealisation) {
            throw new common_1.NotFoundException(errors_1.RealisationErrors[errors_1.REALISATION_UPDATE_FAILED]);
        }
        return this.findById(id);
    }
    async delete(id) {
        if (!mongoose_2.Types.ObjectId.isValid(id)) {
            throw new common_1.BadRequestException('Invalid realisation ID');
        }
        const session = await this.realisationModel.db.startSession();
        session.startTransaction();
        try {
            const realisation = await this.realisationModel.findById(id).exec();
            if (!realisation) {
                throw new common_1.NotFoundException(errors_1.RealisationErrors[errors_1.REALISATION_NOT_FOUND]);
            }
            const files = await this.realisationFileModel.find({ realisation_id: id }).exec();
            for (const file of files) {
                await file.setDeleted();
            }
            await realisation.setDeleted();
            await session.commitTransaction();
            session.endSession();
            return true;
        }
        catch (error) {
            await session.abortTransaction();
            session.endSession();
            console.error(`Failed to delete realisation: ${error.message}`, error.stack);
            if (error instanceof common_1.NotFoundException || error instanceof common_1.BadRequestException) {
                throw error;
            }
            throw new Error(`Failed to delete realisation: ${error.message}`);
        }
    }
    async addFiles(id, images) {
        if (!mongoose_2.Types.ObjectId.isValid(id)) {
            throw new common_1.BadRequestException('Invalid realisation ID');
        }
        if (!images || !images.length) {
            throw new common_1.BadRequestException('At least one image is required');
        }
        const session = await this.realisationModel.db.startSession();
        session.startTransaction();
        try {
            const realisation = await this.realisationModel.findById(id).exec();
            if (!realisation) {
                throw new common_1.NotFoundException(errors_1.RealisationErrors[errors_1.REALISATION_NOT_FOUND]);
            }
            for (const image of images) {
                const realisationFile = new this.realisationFileModel({
                    image,
                    realisation_id: realisation._id,
                });
                realisationFile.file_path = await this.storageService.uploadRealisationImage(image, realisationFile._id.toString());
                await realisationFile.save({ session });
            }
            await session.commitTransaction();
            session.endSession();
            return this.findById(id);
        }
        catch (error) {
            await session.abortTransaction();
            session.endSession();
            console.error(`Failed to add files to realisation: ${error.message}`, error.stack);
            if (error instanceof common_1.NotFoundException || error instanceof common_1.BadRequestException) {
                throw error;
            }
            throw new Error(`Failed to add files to realisation: ${error.message}`);
        }
    }
    async deleteFile(realisationId, fileId) {
        if (!mongoose_2.Types.ObjectId.isValid(realisationId) || !mongoose_2.Types.ObjectId.isValid(fileId)) {
            throw new common_1.BadRequestException('Invalid ID format');
        }
        const session = await this.realisationModel.db.startSession();
        session.startTransaction();
        try {
            const realisation = await this.realisationModel.findById(realisationId).exec();
            if (!realisation) {
                throw new common_1.NotFoundException(errors_1.RealisationErrors[errors_1.REALISATION_NOT_FOUND]);
            }
            const file = await this.realisationFileModel
                .findOne({
                _id: fileId,
                realisation_id: realisationId,
            })
                .exec();
            if (!file) {
                throw new common_1.NotFoundException('File not found');
            }
            await file.deleteOne({ session });
            await session.commitTransaction();
            session.endSession();
            return this.findById(realisationId);
        }
        catch (error) {
            await session.abortTransaction();
            session.endSession();
            console.error(`Failed to delete file: ${error.message}`, error.stack);
            if (error instanceof common_1.NotFoundException || error instanceof common_1.BadRequestException) {
                throw error;
            }
            throw new Error(`Failed to delete file: ${error.message}`);
        }
    }
    async populateRealisationFiles(realisationId) {
        const allFiles = await this.realisationFileModel
            .find({ realisation_id: realisationId })
            .exec();
        return allFiles;
    }
    sanitizeFilter(filter) {
        const safeFilter = {};
        const allowedFields = ['title', 'description', 'category', 'profile_professionnel_id'];
        for (const field of allowedFields) {
            if (filter[field] !== undefined) {
                safeFilter[field] = filter[field];
            }
        }
        return safeFilter;
    }
};
exports.RealisationService = RealisationService;
exports.RealisationService = RealisationService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(main_database_connection_1.REALISATION_MODEL_NAME, main_database_connection_1.DATABASE_CONNECTION)),
    __param(1, (0, mongoose_1.InjectModel)(main_database_connection_1.REALISATION_FILE_MODEL_NAME, main_database_connection_1.DATABASE_CONNECTION)),
    __metadata("design:paramtypes", [Object, Object, profile_service_1.ProfileService,
        providers_1.StorageService])
], RealisationService);
//# sourceMappingURL=realisation.service.js.map