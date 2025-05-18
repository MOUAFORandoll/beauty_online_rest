// profilee.dto.ts
import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsDate, IsNotEmpty, IsOptional, IsString } from 'class-validator';
export class CreateRendezVousDto {
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    creneau_id: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    realisation_id: string;
}

export class UpdateRendezVousDto {
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
