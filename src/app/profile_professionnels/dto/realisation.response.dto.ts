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
    realisation_files: {
        id: string;
        file_path: string;
    }[];
    static async fromRealisation(
        realisation: Realisation,
        realisationFileModel: RealisationFileModel,
    ): Promise<RealisationResponseDto> {
        const allFiles = await realisationFileModel
            .find({ realisation_id: realisation._id })
            .exec();
        const formattedFiles = allFiles.map((file) => ({
            id: file._id.toString(),
            file_path: file.file_path,
        }));
        return {
            id: realisation._id.toString(),
            title: realisation.title,
            is_video: realisation.isVideo,
            price: realisation.price,
            profile_professionnel_id: realisation.profile_professionnel_id.toString(),
            realisation_files: formattedFiles,
        };
    }
}
