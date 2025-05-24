import { ApiProperty } from '@nestjs/swagger';
import {
    RealisationModel,
    PositionModel,
    AgendaModel,
    Realisation,
    RealisationFileModel,
    RendezVousModel,
    VueModel,
    ShareModel,
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
    nombre_vues: number;
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
        realisationFileModel: RealisationFileModel,
        agendaModel: AgendaModel,
        positionModel: PositionModel,
        realisationModel: RealisationModel,
        rendezVousModel: RendezVousModel,
        vueModel: VueModel,
        shareModel: ShareModel,
        profileService: ProfileService,
    ): Promise<ActuResponseDto> {
        const numbreDeVues = await vueModel
            .find({ realisation_id: realisation._id.toString() })
            .countDocuments()
            .exec();
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
            nombre_partages: nombreDePartages,
        };
    }
}
