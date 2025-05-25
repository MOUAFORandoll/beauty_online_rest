import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
export class GeneralNotificationDto {
    @ApiProperty({ type: String, required: true })
    @IsNotEmpty()
    message: string;
}

export class ParticularNotificationDto {
    @ApiProperty({ type: String, required: true })
    @IsNotEmpty()
    userId: string;

    @ApiProperty({ type: String, required: true })
    @IsNotEmpty()
    message: string;
}
