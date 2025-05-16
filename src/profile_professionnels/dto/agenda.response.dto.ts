import { ApiProperty } from '@nestjs/swagger';
import { Agenda, Crenau, CrenauModel } from '../../databases/services/entities';

export class CrenauResponseDto {
    @ApiProperty()
    id: string;

    @ApiProperty()
    startTimeAvailable: string;

    @ApiProperty()
    endTimeAvailable: string;

    static fromCrenau(crenau: Crenau): CrenauResponseDto {
        return {
            id: crenau._id as string,
            startTimeAvailable: crenau.startTimeAvailable,
            endTimeAvailable: crenau.endTimeAvailable,
        };
    }
}

export class AgendaResponseDto {
    @ApiProperty()
    id: string;

    @ApiProperty()
    day: Date;

    @ApiProperty({ type: [CrenauResponseDto] })
    crenaux: CrenauResponseDto[];

    static async fromAgenda(agenda: Agenda, crenauModel: CrenauModel): Promise<AgendaResponseDto> {
        const crenaux = await crenauModel.find({ agenda_id: agenda._id }).exec();
        return {
            id: agenda._id as string,
            day: agenda.day,
            crenaux: crenaux.map((cr) => CrenauResponseDto.fromCrenau(cr)),
        };
    }
}
