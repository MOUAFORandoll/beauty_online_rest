import { ApiProperty } from '@nestjs/swagger';
import {
    RealisationModel,
    PositionModel,
    AgendaModel,
    Realisation,
    RealisationFileModel,
    RendezVousModel,
    VueRealisationModel,
    ShareRealisationModel,
    LikeRealisationModel,
} from 'src/databases/main.database.connection';
import { ProfileResponseDto } from 'src/app/profile_professionnels/dto';
import { ProfileService } from 'src/app/profile_professionnels/providers';
import { ConfigService } from '@nestjs/config';

export class ActuResponseDto {
    @ApiProperty()
    id: string;

    @ApiProperty()
    title: string;

    @ApiProperty()
    price: string;

    @ApiProperty()
    nombre_vues: number;
    @ApiProperty()
    nombre_likes: number;

    @ApiProperty()
    has_liked: boolean;

    @ApiProperty()
    is_video: boolean;

    @ApiProperty()
    video_link: string;
    @ApiProperty()
    nombre_partages: number;

    @ApiProperty()
    profile_professionnel: ProfileResponseDto;

    @ApiProperty()
    realisation_files: {
        id: string;
        file_path: string;
    }[];
    static async fromActu(
        realisation: Realisation,
        userId: string,
        realisationFileModel: RealisationFileModel,
        agendaModel: AgendaModel,
        positionModel: PositionModel,
        realisationModel: RealisationModel,
        rendezVousModel: RendezVousModel,
        vueModel: VueRealisationModel,
        shareModel: ShareRealisationModel,
        likeModel: LikeRealisationModel,
        profileService: ProfileService,
        configService: ConfigService,
    ): Promise<ActuResponseDto> {
        const numbreDeVues = await vueModel
            .find({ realisation_id: realisation._id.toString() })
            .countDocuments()
            .exec();
        const numbreDeLikes = await likeModel
            .find({ realisation_id: realisation._id.toString() })
            .countDocuments()
            .exec();
        const hasLiked =
            userId == null
                ? false
                : (await likeModel
                      .find({ realisation_id: realisation._id.toString(), user_id: userId })
                      .countDocuments()
                      .exec()) != 0;
        const nombreDePartages = await shareModel
            .find({ realisation_id: realisation._id.toString() })
            .countDocuments()
            .exec();
        const allFiles = await realisationFileModel
            .find({ realisation_id: realisation._id.toString() })
            .exec();
        const formattedFiles = allFiles.map((file) => ({
            id: file._id.toString(),
            file_path: file.file_path,
        }));

        const profile = await profileService.findOneById(realisation.profile_professionnel_id);
        const profileProfessionnel = await ProfileResponseDto.fromProfile(
            profile,
            agendaModel,
            positionModel,
            realisationModel,
            rendezVousModel,
        );
        return {
            id: realisation._id.toString(),
            title: realisation.title,
            price: realisation.price,
            profile_professionnel: profileProfessionnel,
            realisation_files: formattedFiles,
            nombre_vues: numbreDeVues,
            nombre_likes: numbreDeLikes,
            nombre_partages: nombreDePartages,
            has_liked: hasLiked,
            is_video: realisation.isVideo,
            video_link: realisation.isVideo
                ? configService.get('APP_API_URL') +
                  '/api/actus/' +
                  formattedFiles[0].id +
                  '/stream'
                : null,
        };
    }
}
