// profilee.dto.ts
import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { ServiceType } from 'src/databases/users/entities';

export class CreateProfileDto {
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    namePro: string;

    @ApiProperty({ enum: ServiceType, example: ServiceType.COIFFURE })
    @IsEnum(ServiceType, {
        message: 'Service must be one of the predefined values: COIFFURE, MANICURE',
    })
    service: string;

    @ApiProperty()
    @IsString()
    description: string;

    @ApiProperty({ type: Number, required: false })
    @IsNumber()
    @IsOptional()
    longitude: number;

    @ApiProperty({ type: Number, required: false })
    @IsNumber()
    @IsOptional()
    latitude: number;

    @ApiProperty()
    @IsString()
    titleEmplacement: string;
    @ApiProperty({
        type: String,
        format: 'binary',
        required: false,
        description: 'Couverture Pro',
    })
    @IsOptional()
    cover?: Express.Multer.File;
}

export class FindByServiceDto {
    @ApiProperty({ enum: ServiceType, example: ServiceType.COIFFURE })
    @IsEnum(ServiceType, {
        message: 'Service must be one of the predefined values: COIFFURE, MANICURE',
    })
    @IsOptional()
    service: string;

    @ApiProperty()
    @IsString()
    @IsOptional()
    namePro: string;

    @ApiProperty()
    @IsOptional()
    description: string;
}
