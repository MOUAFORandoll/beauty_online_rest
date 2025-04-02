// profilee.dto.ts
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

// realisation.dto.ts
 

export class CreateRealisationDto {
    @ApiProperty({ description: 'Titre de la réalisation' })
    @IsString()
    @IsNotEmpty()
    title: string;

    @ApiProperty({ description: "Chemin de l'image de la réalisation" })
    @IsString()
    @IsNotEmpty()
    image_path: string;
}

export class UpdateRealisationDto {
    @ApiProperty({ description: 'Nouveau titre de la réalisation', required: false })
    @IsString()
    @IsOptional()
    title?: string;

    @ApiProperty({ description: "Nouveau chemin de l'image de la réalisation", required: false })
    @IsString()
    @IsOptional()
    image_path?: string;
}

export class FindRealisationDto {
    @ApiProperty({ description: 'Titre de la réalisation (recherche par titre)', required: false })
    @IsString()
    @IsOptional()
    title?: string;

    @ApiProperty()
    @IsString()
    @IsOptional()
    namePro: string;
}
