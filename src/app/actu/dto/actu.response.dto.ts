import { ApiProperty } from '@nestjs/swagger';
import {
    RealisationModel,
    PositionModel,
    AgendaModel,
    Realisation,
    RealisationFileModel,
    RendezVousModel,
} from 'src/databases/main.database.connection';
import { ProfileResponseDto } from 'src/app/profile_professionnels/dto';
import { ProfileService } from 'src/app/profile_professionnels/providers';

export class ActuResponseDto {
    @ApiProperty()
    id: string;

    @ApiProperty()
    title: string;

    @ApiProperty()
    price: string;

    @ApiProperty()
    profile_professionnel: ProfileResponseDto;

    @ApiProperty()
    realisation_files: {
        id: string;
        file_path: string;
    }[];
    static async fromActu(
        realisation: Realisation,
        realisationFileModel: RealisationFileModel,
        agendaModel: AgendaModel,
        positionModel: PositionModel,
        realisationModel: RealisationModel,
        rendezVousModel: RendezVousModel,
        profileService: ProfileService,
    ): Promise<ActuResponseDto> {
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
        };
    }
}
