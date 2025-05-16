// profilee.dto.ts
import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsNotEmpty, IsOptional, IsString } from 'class-validator';
export class CreateAgendaDto {
    @ApiProperty()
    @IsNotEmpty()
    day: string;
    @ApiProperty()
    @IsNotEmpty()
    crenaux: { startTimeAvailable: string; endTimeAvailable: string }[];
}
export class AddCrenauxAgendaDto {
    @ApiProperty()
    @IsNotEmpty()
    crenaux: Array<{ startTimeAvailable: string; endTimeAvailable: string }>;
}

export class UpdateAgendaDto {
    @ApiProperty()
    @IsDate()
    @IsOptional()
    day: string;

    @ApiProperty()
    @IsString()
    @IsOptional()
    startTimeAvailable: string;

    @ApiProperty()
    @IsString()
    @IsOptional()
    endTimeAvailable: string;
}
