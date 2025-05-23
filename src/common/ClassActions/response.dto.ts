import { ApiProperty } from '@nestjs/swagger';

export class ShareLink {
    @ApiProperty({ type: String })
    shareLink: string;
}