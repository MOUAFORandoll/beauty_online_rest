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
    RealisationVideoModel,
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
    video: {
        id: string;
        video_link: string;
        thumbnail: string;
    };
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
        realisationVideoModel: RealisationVideoModel,
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
        const video = await realisationVideoModel
            .findOne({ realisation_id: realisation._id })
            .exec();
        const formattedVideo = video
            ? {
                  id: video._id.toString(),
                  video_link:
                      configService.get('STREAM_URL') + '/stream/' + video._id.toString(),
                  thumbnail: video.thumbnail,
              }
            : null;
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
            video: realisation.isVideo ? formattedVideo : undefined,
        };
    }
}
