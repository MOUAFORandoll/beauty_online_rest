// realisation.service.ts
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import {
    DATABASE_CONNECTION,
    Realisation,
    REALISATION_MODEL_NAME,
    RealisationModel,
    RealisationFileModel,
    REALISATION_FILE_MODEL_NAME,
    VUE_REALISATION_MODEL_NAME,
    VueRealisationModel,
    ShareRealisationModel,
    SHARE_REALISATION_MODEL_NAME,
    LikeRealisationModel,
    LIKE_REALISATION_MODEL_NAME,
    PROFILE_PRO_MODEL_NAME,
    ProfileProfessionnelModel,
    ProfileProfessionnel,
    RealisationVideoModel,
    RealisationVideo,
    REALISATION_VIDEO_MODEL_NAME,
} from 'src/databases/main.database.connection';
import { PaginationPayloadDto } from 'src/common/apiutils';
import { Shareable, ShareableProperties } from 'src/common/ClassActions/action.shareable';
import { ConfigService } from '@nestjs/config';
@Injectable()
@Shareable({
    sharePath: 'actu',
})
export class ActuService {
    private self: ActuService & ShareableProperties;
    constructor(
        @InjectModel(VUE_REALISATION_MODEL_NAME, DATABASE_CONNECTION)
        private readonly vueModel: VueRealisationModel,
        @InjectModel(REALISATION_MODEL_NAME, DATABASE_CONNECTION)
        private readonly realisationModel: RealisationModel,
        @InjectModel(REALISATION_VIDEO_MODEL_NAME, DATABASE_CONNECTION)
        private readonly realisationVideoModel: RealisationVideoModel,
        @InjectModel(SHARE_REALISATION_MODEL_NAME, DATABASE_CONNECTION)
        private readonly shareModel: ShareRealisationModel,
        @InjectModel(LIKE_REALISATION_MODEL_NAME, DATABASE_CONNECTION)
        private readonly likeModel: LikeRealisationModel,

        @InjectModel(PROFILE_PRO_MODEL_NAME, DATABASE_CONNECTION)
        private readonly profileModel: ProfileProfessionnelModel,

        @InjectModel(REALISATION_FILE_MODEL_NAME, DATABASE_CONNECTION)
        private readonly realisationFileModel: RealisationFileModel,
        private configService: ConfigService,
    ) {
        this.self = this as unknown as ActuService & ShareableProperties;
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
    async findOneById(id: string): Promise<Realisation> {
        const actu = await this.realisationModel.findById(id).exec();

        return actu;
    }
    async findOneRealisationVideoById(id: string): Promise<RealisationVideo> {
        const realisation = await this.realisationVideoModel.findById(id).exec();

        return realisation;
    }
    async shareActu(actu_id: string, user_id: string): Promise<string> {
        const share = new this.shareModel({
            realisation_id: actu_id,

            user_id: user_id,
        });

        await share.save();
        return this.self.share(actu_id.toString());
    }

    async vueActu(actu_id: string, user_id: string) {
        try {
            const vue = new this.vueModel({
                realisation_id: actu_id,

                user_id: user_id,
            });

            await vue.save();
        } catch (error) {
            throw new Error(`Failed to create profile: ${error.message}`);
        }
    }
    /**
     * Like a realisation
     */
    async likeRealisation(userId: string, realisationId: string): Promise<void> {
        const alreadyLiked = await this.likeModel.findOne({
            user_id: userId,
            realisation_id: realisationId,
        });

        if (alreadyLiked) {
            await this.likeModel.deleteOne({
                user_id: userId,
                realisation_id: realisationId,
            });
        } else {
            await this.likeModel.create({
                user_id: userId,
                realisation_id: realisationId,
            });
        }
    }

    /**
     * Get number of likes for a realisation
     */
    async countLikes(realisationId: string): Promise<number> {
        return this.likeModel.countDocuments({ realisation_id: realisationId });
    }

    /**
     * Check if user liked the realisation
     */
    async hasLiked(userId: string, realisationId: string): Promise<boolean> {
        const liked = await this.likeModel.exists({
            user_id: userId,
            realisation_id: realisationId,
        });
        return !!liked;
    }

    async searchData(
        search: string,
    ): Promise<{ total: number; realisations: Realisation[]; profiles: ProfileProfessionnel[] }> {
        const filterPro = {
            namePro: { $regex: search, $options: 'i' },
        };
        const filterRea = {
            title: { $regex: search, $options: 'i' },
        };
        const totalRealisation = await this.realisationModel.countDocuments(filterRea).exec();
        const realisations = await this.realisationModel.find(filterRea).exec();
        const totalProfile = await this.profileModel.countDocuments(filterPro).exec();
        const profiles = await this.profileModel.find(filterPro).exec();
        const total = totalRealisation + totalProfile;
        return {
            total,
            realisations,
            profiles,
        };
    }
}
