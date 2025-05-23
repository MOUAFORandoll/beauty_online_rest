import { AgendaModel, RealisationModel, RendezVous, RealisationFileModel, CreneauModel, RendezVousModel } from '../../../databases/services/entities';
import { UserDto } from 'src/app/users/dto';
import { PositionModel, ProfileProfessionnelModel, UserModel } from 'src/databases/users/entities';
import { CreneauResponseDto, ProfileResponseDto, RealisationResponseDto } from 'src/app/profile_professionnels/dto';
export declare class RendezVousResponseDto {
    id: string;
    status: string;
    user: UserDto;
    day: Date;
    realisation: RealisationResponseDto;
    professional: ProfileResponseDto;
    professional_phone: string;
    creneau: CreneauResponseDto;
    static fromRendezVous(userModel: UserModel, agendaModel: AgendaModel, realisationModel: RealisationModel, realisationFileModel: RealisationFileModel, creneauModel: CreneauModel, profileModel: ProfileProfessionnelModel, rendezVousModel: RendezVousModel, positionModel: PositionModel, rendezVous: RendezVous): Promise<RendezVousResponseDto>;
}
