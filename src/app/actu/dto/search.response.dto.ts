import { ApiProperty } from '@nestjs/swagger';

export class SearchResponseDto {
    @ApiProperty()
    type: string;
    @ApiProperty()
    title: string;

    @ApiProperty()
    description: string;

    @ApiProperty()
    url: string;

    @ApiProperty()
    data: any;
}
