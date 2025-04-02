// profile.dto.ts
import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsMongoId, IsNotEmpty, IsString } from 'class-validator';
import { ServiceType } from 'src/databases/users/entities';

export class CreateProfilDto {
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    namePro: string;

    @ApiProperty({ enum: ServiceType, example: ServiceType.COIFFURE })
    @IsEnum(ServiceType, {
        message: 'Service must be one of the predefined values: COIFFURE, MANICURE',
    })
    service: string;
}
