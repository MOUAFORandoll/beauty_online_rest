import { Realisation, RealisationModel, RealisationFileModel } from 'src/databases/main.database.connection';
import { PaginationPayloadDto } from 'src/common/apiutils';
import { ConfigService } from '@nestjs/config';
export declare class ActuService {
    private readonly realisationModel;
    private readonly realisationFileModel;
    private configService;
    private self;
    constructor(realisationModel: RealisationModel, realisationFileModel: RealisationFileModel, configService: ConfigService);
    findAll(pagination: PaginationPayloadDto): Promise<{
        data: Realisation[];
        total: number;
    }>;
    findOneById(id: string): Promise<Realisation>;
    shareActu(actuId: string): string;
}
