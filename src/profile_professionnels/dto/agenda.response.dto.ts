import { ApiProperty } from '@nestjs/swagger';
import { Agenda } from '../../databases/services/entities';
export class AgendaResponseDto {
    @ApiProperty()
    id: string;
    @ApiProperty()
    day: Date;

    @ApiProperty()
    startTimeAvailable: string;

    @ApiProperty()
    endTimeAvailable: string;
    static fromAgenda(agenda: Agenda): AgendaResponseDto {
        return {
            id: agenda._id as string,
            day: agenda.day,
            startTimeAvailable: agenda.startTimeAvailable,
            endTimeAvailable: agenda.endTimeAvailable,
        };
    }
}
