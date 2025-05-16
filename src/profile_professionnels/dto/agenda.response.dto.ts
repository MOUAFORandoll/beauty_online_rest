import { ApiProperty } from '@nestjs/swagger';
import { Agenda, Creneau, CreneauModel } from '../../databases/services/entities';

export class CreneauResponseDto {
    @ApiProperty()
    id: string;

    @ApiProperty()
    startTimeAvailable: string;

    @ApiProperty()
    endTimeAvailable: string;

    static fromCreneau(creneau: Creneau): CreneauResponseDto {
        return {
            id: creneau._id as string,
            startTimeAvailable: creneau.startTimeAvailable,
            endTimeAvailable: creneau.endTimeAvailable,
        };
    }
}

export class AgendaResponseDto {
    @ApiProperty()
    id: string;

    @ApiProperty()
    day: Date;

    @ApiProperty({ type: [CreneauResponseDto] })
    creneaux: CreneauResponseDto[];

    static async fromAgenda(
        agenda: Agenda,
        creneauModel: CreneauModel,
    ): Promise<AgendaResponseDto> {
        const creneaux = await creneauModel.find({ agenda_id: agenda._id }).exec();
        return {
            id: agenda._id as string,
            day: agenda.day,
            creneaux: creneaux.map((cr) => CreneauResponseDto.fromCreneau(cr)),
        };
    }
}
