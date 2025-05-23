// // profilee.dto.ts
// import { ApiProperty } from '@nestjs/swagger';
// import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';
// import { ServiceType } from 'src/databases/users/entities';

// export class CreateProfileDto {
//     @ApiProperty()
//     @IsString()
//     @IsNotEmpty()
//     namePro: string;

//     @ApiProperty({ enum: ServiceType, example: ServiceType.COIFFURE })
//     @IsEnum(ServiceType, {
//         message: 'Service must be one of the predefined values: COIFFURE, MANICURE',
//     })
//     service: string;
// }

// export class FindByServiceDto {
//     @ApiProperty({ enum: ServiceType, example: ServiceType.COIFFURE })
//     @IsEnum(ServiceType, {
//         message: 'Service must be one of the predefined values: COIFFURE, MANICURE',
//     })
//     @IsOptional()
//     service: string;

//     @ApiProperty()
//     @IsString()
//     @IsOptional()
//     namePro: string;
// }


