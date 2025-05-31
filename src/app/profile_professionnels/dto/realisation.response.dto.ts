import { ConfigService } from '@nestjs/config';
import { ApiProperty } from '@nestjs/swagger';
import { Realisation, RealisationFileModel } from 'src/databases/main.database.connection';

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
    video_link: string;
    @ApiProperty()
    realisation_files: {
        id: string;
        file_path: string;
    }[];
    static async fromRealisation(
        realisation: Realisation,
        realisationFileModel: RealisationFileModel,
        configService: ConfigService,
    ): Promise<RealisationResponseDto> {
        const allFiles = await realisationFileModel
            .find({ realisation_id: realisation._id })
            .exec();
        const formattedFiles = allFiles.map((file) => ({
            id: file._id.toString(),
            file_path: file.file_path,
        }));
        const videoLink = realisation.isVideo
            ? configService.get('APP_API_URL') +
              '/api/actus/' +
              formattedFiles[0].id.toString() +
              '/stream'
            : null;
        return {
            id: realisation._id.toString(),
            title: realisation.title,
            price: realisation.price,
            profile_professionnel_id: realisation.profile_professionnel_id.toString(),
            realisation_files: formattedFiles,
            is_video: realisation.isVideo,
            video_link: videoLink,
        };
    }
}
