export declare class CreateAgendaDto {
    day: string;
    creneaux: {
        startTimeAvailable: string;
        endTimeAvailable: string;
    }[];
}
export declare class AddCreneauxAgendaDto {
    creneaux: Array<{
        startTimeAvailable: string;
        endTimeAvailable: string;
    }>;
}
export declare class UpdateAgendaDto {
    day: string;
    startTimeAvailable: string;
    endTimeAvailable: string;
}
