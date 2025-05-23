import { Position } from '../../../databases/users/entities';
export declare class PositionResponseDto {
    longitude: string;
    latitude: string;
    country: string;
    town: string;
    title_emplacement: string;
    static fromPosition(position: Position): PositionResponseDto;
}
