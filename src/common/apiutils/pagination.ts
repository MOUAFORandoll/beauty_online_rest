import { IsInt, IsOptional, Min } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class PaginationPayloadDto {
    @ApiProperty({ required: false, type: Number })
    @IsOptional()
    @IsInt()
    @Min(1)
    @Type(() => Number)
    page?: number = 1;

    @ApiProperty({ required: false, type: Number })
    @IsOptional()
    @IsInt()
    @Min(1)
    @Type(() => Number)
    size?: number = 15;
}

export class PaginationResponseDto<T> {
    @ApiProperty({ type: Number })
    page: number;
    @ApiProperty({ type: Number })
    size: number;
    @ApiProperty({ required: false, type: Number })
    next_page?: number;
    @ApiProperty({ required: false, type: Number })
    previous_page?: number;
    @ApiProperty({ type: Number })
    total: number;
    @ApiProperty() // TODO fix
    content: T[];

    static responseDto<T>(
        requestPayload: PaginationPayloadDto,
        content: T[],
        total: number = 0,
    ): PaginationResponseDto<T> {
        const response = new PaginationResponseDto<T>();
        response.page = requestPayload.page;
        response.size = requestPayload.size;
        if (requestPayload.page > 1) {
            response.previous_page = requestPayload.page - 1;
        } else if (requestPayload.page * requestPayload.size < total) {
            response.next_page = requestPayload.page + 1;
        }
        response.content = content;
        response.total = total;
        return response;
    }

    map<U>(callbackfn: (value: T, index: number, array: T[]) => U): PaginationResponseDto<U> {
        const response = new PaginationResponseDto<U>();
        response.content = this.content.map(callbackfn, this);
        response.page = this.page;
        response.size = this.size;
        response.previous_page = this.previous_page;
        response.next_page = this.next_page;
        response.total = this.total;

        return response;
    }

    async mapPromise<U>(
        callbackfn: (value: T, index: number, array: T[]) => Promise<U>,
    ): Promise<PaginationResponseDto<U>> {
        const response = new PaginationResponseDto<U>();
        response.content = await Promise.all(this.content.map(callbackfn));
        response.page = this.page;
        response.size = this.size;
        response.previous_page = this.previous_page;
        response.next_page = this.next_page;
        response.total = this.total;

        return response;
    }
}
