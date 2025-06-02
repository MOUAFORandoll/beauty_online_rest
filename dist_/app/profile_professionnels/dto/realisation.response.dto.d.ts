import { ConfigService } from '@nestjs/config';
import { Realisation, RealisationFileModel, RealisationVideoModel } from 'src/databases/main.database.connection';
export declare class RealisationResponseDto {
    id: string;
    title: string;
    price: string;
    profile_professionnel_id: string;
    is_video: boolean;
    video: {
        id: string;
        video_link: string;
        thumbnail: string;
    };
    realisation_files: {
        id: string;
        file_path: string;
    }[];
    static fromRealisation(realisation: Realisation, realisationFileModel: RealisationFileModel, realisationVideoModel: RealisationVideoModel, configService: ConfigService): Promise<RealisationResponseDto>;
}
