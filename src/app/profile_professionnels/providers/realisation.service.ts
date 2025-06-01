// realisation.service.ts
import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import {
    DATABASE_CONNECTION,
    ProfileProfessionnel,
    Realisation,
    REALISATION_MODEL_NAME,
    RealisationModel,
    RealisationFileModel,
    RealisationFile,
    REALISATION_FILE_MODEL_NAME,
    REALISATION_VIDEO_MODEL_NAME,
    RealisationVideoModel,
} from 'src/databases/main.database.connection';
import { PaginationPayloadDto } from 'src/common/apiutils';
import { QueryOptions, Types } from 'mongoose';
import {
    CreateRealisationDto,
    CreateRealisationVideoDto,
    FindRealisationDto,
    UpdateRealisationDto,
} from '../dto/realisation.request.dto';
import {
    PROFILE_PRO_NOT_FOUND,
    ProfileProErrors,
    REALISATION_NOT_FOUND,
    REALISATION_UPDATE_FAILED,
    RealisationErrors,
} from '../errors';
import { ProfileService } from './profile.service';
import { StorageService } from 'src/common/modules/external/providers';

@Injectable()
export class RealisationService {
    constructor(
        @InjectModel(REALISATION_MODEL_NAME, DATABASE_CONNECTION)
        private readonly realisationModel: RealisationModel,

        @InjectModel(REALISATION_FILE_MODEL_NAME, DATABASE_CONNECTION)
        private readonly realisationFileModel: RealisationFileModel,

        @InjectModel(REALISATION_VIDEO_MODEL_NAME, DATABASE_CONNECTION)
        private readonly realisationVideoModel: RealisationVideoModel,

        private readonly profileService: ProfileService,
        private readonly storageService: StorageService,
    ) {}

    /**
     * Create a new realisation with associated files
     * @param dto The realisation data
     * @param user_id The user ID
     * @returns The created realisation with its files
     */
    async createWithImages(dto: CreateRealisationDto, user_id: string): Promise<Realisation> {
        // Validate input
        if (!dto.files || !dto.files.length) {
            throw new BadRequestException('At least one image is required');
        }

        // Use a session for transaction
        const session = await this.realisationModel.db.startSession();
        session.startTransaction();

        try {
            // Find the professional profile
            const profilePro: ProfileProfessionnel =
                await this.profileService.findUserProfile(user_id);
            if (!profilePro) {
                throw new NotFoundException(ProfileProErrors[PROFILE_PRO_NOT_FOUND]);
            }

            // Create the realisation
            const realisation = new this.realisationModel({
                ...dto,
                isVideo: false,

                profile_professionnel_id: profilePro._id,
            });
            await realisation.save({ session });

            // Process and save files
            const savedFiles = [];
            for (const file of dto.files) {
                try {
                    const realisationFile = new this.realisationFileModel({
                        file,
                        realisation_id: realisation._id,
                    });

                    realisationFile.file_path = await this.storageService.uploadRealisationImage(
                        file,
                        realisationFile._id.toString(),
                    );

                    await realisationFile.save({ session });
                    savedFiles.push(realisationFile);
                } catch (error) {
                    console.error(`Failed to upload file: ${error.message}`, error.stack);
                    throw new Error(`Failed to upload file: ${error.message}`);
                }
            }

            await session.commitTransaction();
            await session.endSession();

            // Return the complete realisation with files
            return this.findById(realisation._id.toString());
        } catch (error) {
            await session.abortTransaction();
            await session.endSession();

            console.error(`Failed to create realisation: ${error.message}`, error.stack);

            if (error instanceof NotFoundException || error instanceof BadRequestException) {
                throw error;
            }

            throw new Error(`Failed to create realisation: ${error.message}`);
        }
    }
    /**
     * Create a new realisation with associated files
     * @param dto The realisation data
     * @param user_id The user ID
     * @returns The created realisation with a video
     */
    async createWithVideo(dto: CreateRealisationVideoDto, user_id: string): Promise<Realisation> {
        // Validate input
        if (!dto.file) {
            throw new BadRequestException('At least one video is required');
        }

        // Use a session for transaction
        const session = await this.realisationModel.db.startSession();
        session.startTransaction();

        try {
            // Find the professional profile
            const profilePro: ProfileProfessionnel =
                await this.profileService.findUserProfile(user_id);
            if (!profilePro) {
                throw new NotFoundException(ProfileProErrors[PROFILE_PRO_NOT_FOUND]);
            }

            // Create the realisation
            const realisation = new this.realisationModel({
                ...dto,
                isVideo: true,
                profile_professionnel_id: profilePro._id,
            });
            await realisation.save({ session });

            try {
                const realisationVideoFile = new this.realisationVideoModel({
                    realisation_id: realisation._id,
                });

               const storedVideo = await this.storageService.processAndStoreVideoWithThumbnail(
                   dto.file,
                   realisationVideoFile._id.toString(),
               );

                realisationVideoFile.video_path = storedVideo.filename;
                realisationVideoFile.thumbnail = storedVideo.thumbnailUrl;

                await realisationVideoFile.save({ session });
            } catch (error) {
                console.error(`Failed to upload file: ${error.message}`, error.stack);
                throw new Error(`Failed to upload file: ${error.message}`);
            }

            await session.commitTransaction();
            await session.endSession();

            // Return the complete realisation with files
            return this.findById(realisation._id.toString());
        } catch (error) {
            await session.abortTransaction();
            await session.endSession();

            console.error(`Failed to create realisation: ${error.message}`, error.stack);

            if (error instanceof NotFoundException || error instanceof BadRequestException) {
                throw error;
            }

            throw new Error(`Failed to create realisation: ${error.message}`);
        }
    }
    /**
     * Find a realisation by ID with its files
     * @param id The realisation ID
     * @returns The realisation with its files
     */
    async findById(id: string): Promise<Realisation> {
        if (!Types.ObjectId.isValid(id)) {
            throw new BadRequestException('Invalid realisation ID');
        }

        const realisation = await this.realisationModel.findById(id).exec();
        if (!realisation) {
            throw new NotFoundException(RealisationErrors[REALISATION_NOT_FOUND]);
        }

        return realisation;
    }

    /**
     * Find all realisations for a user
     * @param user_id The user ID
     * @param pagination Pagination options
     * @returns Paginated realisations with their files
     */
    async findUserRealisation(
        idUser: string,
        pagination: PaginationPayloadDto,
    ): Promise<{ data: Realisation[]; total: number }> {
        const profilePro: ProfileProfessionnel = await this.profileService.findUserProfile(idUser);
        if (!profilePro) {
            throw new NotFoundException(ProfileProErrors[PROFILE_PRO_NOT_FOUND]);
        }

        const [data, total] = await Promise.all([
            this.realisationModel
                .find({ profile_professionnel_id: profilePro._id })
                .sort({ createdAt: -1 }) // Sort by newest first
                .skip((pagination.page - 1) * pagination.size)
                .limit(pagination.size)
                .exec(),
            this.realisationModel
                .countDocuments({ profile_professionnel_id: profilePro._id })
                .exec(),
        ]);

        return { data, total };
    }

    /**
     * Find all realisations for a user
     * @param user_id The user ID
     * @param pagination Pagination options
     * @returns Paginated realisations with their files
     */
    async findProfessionalRealisation(
        idProfessionnel: string,
        pagination: PaginationPayloadDto,
    ): Promise<{ data: Realisation[]; total: number }> {
        // const profilePro: ProfileProfessionnel =
        //     await this.profileService.findOneById(idProfessionnel);
        // if (!profilePro) {
        //     throw new NotFoundException(ProfileProErrors[PROFILE_PRO_NOT_FOUND]);
        // }

        const [data, total] = await Promise.all([
            this.realisationModel
                .find({ profile_professionnel_id: idProfessionnel })
                .sort({ createdAt: -1 }) // Sort by newest first
                .skip((pagination.page - 1) * pagination.size)
                .limit(pagination.size)
                .exec(),
            this.realisationModel
                .countDocuments({ profile_professionnel_id: idProfessionnel })
                .exec(),
        ]);

        return { data, total };
    }

    /**
     * Find realisations by filter criteria
     * @param filter Filter criteria
     * @param pagination Pagination options
     * @returns Paginated realisations with their files
     */
    async findRealisationFilter(
        filter: FindRealisationDto,
        pagination: PaginationPayloadDto,
    ): Promise<{ data: Realisation[]; total: number }> {
        // Validate filter object to prevent injection
        const safeFilter = this.sanitizeFilter(filter);

        const [data, total] = await Promise.all([
            this.realisationModel
                .find(safeFilter)
                .sort({ createdAt: -1 }) // Sort by newest first
                .skip((pagination.page - 1) * pagination.size)
                .limit(pagination.size)
                .exec(),
            this.realisationModel.countDocuments(safeFilter).exec(),
        ]);

        return { data, total };
    }

    /**
     * Find all realisations
     * @param pagination Pagination options
     * @returns Paginated realisations with their files
     */
    async findAll(
        pagination: PaginationPayloadDto,
    ): Promise<{ data: Realisation[]; total: number }> {
        const [data, total] = await Promise.all([
            this.realisationModel
                .find()
                .sort({ createdAt: -1 }) // Sort by newest first
                .skip((pagination.page - 1) * pagination.size)
                .limit(pagination.size)
                .exec(),
            this.realisationModel.countDocuments().exec(),
        ]);

        return { data, total };
    }

    /**
     * Update a realisation
     * @param id The realisation ID
     * @param dto The update data
     * @param options Query options
     * @returns The updated realisation with its files
     */
    async update(
        id: string,
        dto: UpdateRealisationDto,
        options: QueryOptions = { new: true },
    ): Promise<Realisation> {
        if (!Types.ObjectId.isValid(id)) {
            throw new BadRequestException('Invalid realisation ID');
        }

        // Check if realisation exists
        const existingRealisation = await this.realisationModel.findById(id).exec();
        if (!existingRealisation) {
            throw new NotFoundException(RealisationErrors[REALISATION_NOT_FOUND]);
        }

        // Update the realisation
        const updatedRealisation = await this.realisationModel
            .findByIdAndUpdate(id, dto, options)
            .exec();

        if (!updatedRealisation) {
            throw new NotFoundException(RealisationErrors[REALISATION_UPDATE_FAILED]);
        }

        // Return the updated realisation with its files
        return this.findById(id);
    }

    /**
     * Delete a realisation and its files
     * @param id The realisation ID
     * @returns True if deleted successfully
     */
    async delete(id: string): Promise<boolean> {
        if (!Types.ObjectId.isValid(id)) {
            throw new BadRequestException('Invalid realisation ID');
        }

        const session = await this.realisationModel.db.startSession();
        session.startTransaction();

        try {
            // Find the realisation
            const realisation = await this.realisationModel.findById(id).exec();
            if (!realisation) {
                throw new NotFoundException(RealisationErrors[REALISATION_NOT_FOUND]);
            }

            // Find and delete all associated files
            const files = await this.realisationFileModel.find({ realisation_id: id }).exec();

            // Delete files from storage
            for (const file of files) {
                // await this.storageService.deleteFile(file.file_path);
                await file.setDeleted();
            }

            // Delete the realisation
            await realisation.setDeleted();

            await session.commitTransaction();
            session.endSession();

            return true;
        } catch (error) {
            await session.abortTransaction();
            session.endSession();

            console.error(`Failed to delete realisation: ${error.message}`, error.stack);

            if (error instanceof NotFoundException || error instanceof BadRequestException) {
                throw error;
            }

            throw new Error(`Failed to delete realisation: ${error.message}`);
        }
    }

    /**
     * Add files to a realisation
     * @param id The realisation ID
     * @param images The images to add
     * @returns The updated realisation with its files
     */
    async addFiles(id: string, images: Express.Multer.File[]): Promise<Realisation> {
        if (!Types.ObjectId.isValid(id)) {
            throw new BadRequestException('Invalid realisation ID');
        }

        if (!images || !images.length) {
            throw new BadRequestException('At least one image is required');
        }

        const session = await this.realisationModel.db.startSession();
        session.startTransaction();

        try {
            // Find the realisation
            const realisation = await this.realisationModel.findById(id).exec();
            if (!realisation) {
                throw new NotFoundException(RealisationErrors[REALISATION_NOT_FOUND]);
            }

            // Process and save images
            for (const image of images) {
                const realisationFile = new this.realisationFileModel({
                    image,
                    realisation_id: realisation._id,
                });

                realisationFile.file_path = await this.storageService.uploadRealisationImage(
                    image,
                    realisationFile._id.toString(),
                );

                await realisationFile.save({ session });
            }

            await session.commitTransaction();
            session.endSession();

            // Return the updated realisation with its files
            return this.findById(id);
        } catch (error) {
            await session.abortTransaction();
            session.endSession();

            console.error(`Failed to add files to realisation: ${error.message}`, error.stack);

            if (error instanceof NotFoundException || error instanceof BadRequestException) {
                throw error;
            }

            throw new Error(`Failed to add files to realisation: ${error.message}`);
        }
    }

    /**
     * Delete a file from a realisation
     * @param realisationId The realisation ID
     * @param fileId The file ID
     * @returns The updated realisation with its files
     */
    async deleteFile(realisationId: string, fileId: string): Promise<Realisation> {
        if (!Types.ObjectId.isValid(realisationId) || !Types.ObjectId.isValid(fileId)) {
            throw new BadRequestException('Invalid ID format');
        }

        const session = await this.realisationModel.db.startSession();
        session.startTransaction();

        try {
            // Find the realisation
            const realisation = await this.realisationModel.findById(realisationId).exec();
            if (!realisation) {
                throw new NotFoundException(RealisationErrors[REALISATION_NOT_FOUND]);
            }

            // Find the file
            const file = await this.realisationFileModel
                .findOne({
                    _id: fileId,
                    realisation_id: realisationId,
                })
                .exec();

            if (!file) {
                throw new NotFoundException('File not found');
            }

            // Delete the file from storage
            // await this.storageService.deleteFile(file.file_path);

            // Delete the file from database
            await file.deleteOne({ session });

            await session.commitTransaction();
            session.endSession();

            // Return the updated realisation with its files
            return this.findById(realisationId);
        } catch (error) {
            await session.abortTransaction();
            session.endSession();

            console.error(`Failed to delete file: ${error.message}`, error.stack);

            if (error instanceof NotFoundException || error instanceof BadRequestException) {
                throw error;
            }

            throw new Error(`Failed to delete file: ${error.message}`);
        }
    }

    /**
     * Helper method to populate realisation files
     * @param realisations Array of realisations
     * @returns Realisations with their files
     */
    private async populateRealisationFiles(realisationId: string): Promise<RealisationFile[]> {
        // Fetch all files for these realisations in a single query
        const allFiles = await this.realisationFileModel
            .find({ realisation_id: realisationId })
            .exec();

        // Convert to plain objects to avoid mongoose immutability issues
        return allFiles;
    }

    /**
     * Sanitize filter object to prevent injection
     * @param filter The filter object
     * @returns Sanitized filter
     */
    private sanitizeFilter(filter: FindRealisationDto): Record<string, any> {
        const safeFilter: Record<string, any> = {};

        // Only allow specific fields to be filtered
        const allowedFields = ['title', 'description', 'category', 'profile_professionnel_id'];

        for (const field of allowedFields) {
            if (filter[field] !== undefined) {
                safeFilter[field] = filter[field];
            }
        }

        return safeFilter;
    }
}
