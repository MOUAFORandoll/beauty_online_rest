import { ApiProperty } from '@nestjs/swagger';
import { Position } from '../../../databases/users/entities';

export class PositionResponseDto {
    @ApiProperty()
    longitude: string;

    @ApiProperty()
    latitude: string;

    @ApiProperty()
    country: string;

    @ApiProperty()
    town: string;

    @ApiProperty()
    title_emplacement: string;

    static fromPosition(position: Position): PositionResponseDto {
        return {
            title_emplacement: position.titleEmplacement,
            longitude: position.longitude,
            latitude: position.latitude,
            town: position.town,
            country: position.country,
        };
    }
}
