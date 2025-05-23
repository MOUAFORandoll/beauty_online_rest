import { Agenda, Creneau, CreneauModel } from '../../../databases/services/entities';
export declare class CreneauResponseDto {
    id: string;
    startTimeAvailable: string;
    endTimeAvailable: string;
    static fromCreneau(creneau: Creneau): CreneauResponseDto;
}
export declare class AgendaResponseDto {
    id: string;
    day: Date;
    creneaux: CreneauResponseDto[];
    static fromAgenda(agenda: Agenda, creneauModel: CreneauModel): Promise<AgendaResponseDto>;
}
