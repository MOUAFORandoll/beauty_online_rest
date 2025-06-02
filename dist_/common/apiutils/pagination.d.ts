export declare class PaginationPayloadDto {
    page?: number;
    size?: number;
}
export declare class PaginationResponseDto<T> {
    page: number;
    size: number;
    next_page?: number;
    previous_page?: number;
    total: number;
    content: T[];
    static responseDto<T>(requestPayload: PaginationPayloadDto, content: T[], total?: number): PaginationResponseDto<T>;
    map<U>(callbackfn: (value: T, index: number, array: T[]) => U): PaginationResponseDto<U>;
    mapPromise<U>(callbackfn: (value: T, index: number, array: T[]) => Promise<U>): Promise<PaginationResponseDto<U>>;
}
