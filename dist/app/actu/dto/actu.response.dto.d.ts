import { RealisationModel, PositionModel, AgendaModel, Realisation, RealisationFileModel, RendezVousModel, VueRealisationModel, ShareRealisationModel, LikeRealisationModel, RealisationVideoModel } from 'src/databases/main.database.connection';
import { ProfileResponseDto } from 'src/app/profile_professionnels/dto';
import { ProfileService } from 'src/app/profile_professionnels/providers';
import { ConfigService } from '@nestjs/config';
export declare class ActuResponseDto {
    id: string;
    title: string;
    price: string;
    nombre_vues: number;
    nombre_likes: number;
    has_liked: boolean;
    is_video: boolean;
    video: {
        id: string;
        video_link: string;
        thumbnail: string;
    };
    nombre_partages: number;
    profile_professionnel: ProfileResponseDto;
    realisation_files: {
        id: string;
        file_path: string;
    }[];
    static fromActu(realisation: Realisation, userId: string, realisationFileModel: RealisationFileModel, realisationVideoModel: RealisationVideoModel, agendaModel: AgendaModel, positionModel: PositionModel, realisationModel: RealisationModel, rendezVousModel: RendezVousModel, vueModel: VueRealisationModel, shareModel: ShareRealisationModel, likeModel: LikeRealisationModel, profileService: ProfileService, configService: ConfigService): Promise<ActuResponseDto>;
}
