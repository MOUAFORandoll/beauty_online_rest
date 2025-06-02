import { PositionModel, ProfileProfessionnel } from '../../../databases/users/entities';
import { AgendaModel, RealisationModel, RendezVousModel } from 'src/databases/services/entities';
import { PositionResponseDto } from './position.response.dto';
export declare class ProfileResponseDto {
    id: string;
    name_pro: string;
    service: string;
    cover: string;
    description: string;
    position: PositionResponseDto;
    nombre_reservation: number;
    nombre_catalogue: number;
    nombre_actes: number;
    static fromProfile(profile: ProfileProfessionnel, agendaModel: AgendaModel, positionModel: PositionModel, realisationModel: RealisationModel, rendezVousModel: RendezVousModel): Promise<ProfileResponseDto>;
}
