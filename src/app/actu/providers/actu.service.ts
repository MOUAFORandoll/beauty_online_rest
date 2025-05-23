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
        @InjectModel(REALISATION_MODEL_NAME, DATABASE_CONNECTION)
        private readonly realisationModel: RealisationModel,

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
    shareActu(actuId: string): string {
        console.log(actuId);
        return this.self.share(actuId.toString());
    }
}
