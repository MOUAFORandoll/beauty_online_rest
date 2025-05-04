import { ApiProperty } from '@nestjs/swagger';
import { Position } from '../../databases/users/entities';

export class PositionResponseDto {
    @ApiProperty()
    longitude: number;

    @ApiProperty()
    latitude: number;

    @ApiProperty()
    country: string;

    @ApiProperty()
    town: string;

    @ApiProperty()
    title: string;

    static fromPosition(position: Position): PositionResponseDto {
        return {
            title: position.title,
            longitude: position.longitude,
            latitude: position.latitude,
            town: position.town,
            country: position.country,
        };
    }
}
