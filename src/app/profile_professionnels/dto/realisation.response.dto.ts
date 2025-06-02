import { ConfigService } from '@nestjs/config';
import { ApiProperty } from '@nestjs/swagger';
import {
    Realisation,
    RealisationFileModel,
    RealisationVideoModel,
} from 'src/databases/main.database.connection';

export class RealisationResponseDto {
    @ApiProperty()
    id: string;

    @ApiProperty()
    title: string;

    @ApiProperty()
    price: string;
    @ApiProperty()
    profile_professionnel_id: string;

    @ApiProperty()
    is_video: boolean;

    @ApiProperty()
    video: {
        id: string;
        video_link: string;
        thumbnail: string;
    };
    @ApiProperty()
    realisation_files: {
        id: string;
        file_path: string;
    }[];
    static async fromRealisation(
        realisation: Realisation,
        realisationFileModel: RealisationFileModel,
        realisationVideoModel: RealisationVideoModel,
        configService: ConfigService,
    ): Promise<RealisationResponseDto> {
        const allFiles = await realisationFileModel
            .find({ realisation_id: realisation._id })
            .exec();

        const video = await realisationVideoModel
            .findOne({ realisation_id: realisation._id })
            .exec();
        const formattedVideo = video
            ? {
                  id: video._id.toString(),
                  video_link: configService.get('STREAM_URL') + '/stream/' + video._id.toString(),
                  thumbnail: video.thumbnail,
              }
            : null;
        const formattedFiles = allFiles.map((file) => ({
            id: file._id.toString(),
            file_path: file.file_path,
        }));

        return {
            id: realisation._id.toString(),
            title: realisation.title,
            price: realisation.price,
            profile_professionnel_id: realisation.profile_professionnel_id.toString(),
            realisation_files: formattedFiles,
            is_video: realisation.isVideo,
            video: realisation.isVideo ? formattedVideo : undefined,
        };
    }
}
