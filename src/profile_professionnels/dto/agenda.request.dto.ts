// profilee.dto.ts
import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsNotEmpty, IsOptional, IsString } from 'class-validator';
export class CreateAgendaDto {
    @ApiProperty()
    @IsDate()
    @IsNotEmpty()
    day: Date;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    startTimeAvailable: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    endTimeAvailable: string;
}

export class UpdateAgendaDto {
    @ApiProperty()
    @IsDate()
    @IsOptional()
    day: Date;

    @ApiProperty()
    @IsString()
    @IsOptional()
    startTimeAvailable: string;

    @ApiProperty()
    @IsString()
    @IsOptional()
    endTimeAvailable: string;
}
