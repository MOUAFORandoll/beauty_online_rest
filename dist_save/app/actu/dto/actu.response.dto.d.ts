import { RealisationModel, PositionModel, AgendaModel, Realisation, RealisationFileModel, RendezVousModel } from 'src/databases/main.database.connection';
import { ProfileResponseDto } from 'src/app/profile_professionnels/dto';
import { ProfileService } from 'src/app/profile_professionnels/providers';
export declare class ActuResponseDto {
    id: string;
    title: string;
    price: string;
    profile_professionnel: ProfileResponseDto;
    realisation_files: {
        id: string;
        file_path: string;
    }[];
    static fromActu(realisation: Realisation, realisationFileModel: RealisationFileModel, agendaModel: AgendaModel, positionModel: PositionModel, realisationModel: RealisationModel, rendezVousModel: RendezVousModel, profileService: ProfileService): Promise<ActuResponseDto>;
}
