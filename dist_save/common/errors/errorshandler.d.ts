import { ArgumentsHost, ExceptionFilter } from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';
import { IAppError } from './apperror';
export declare class AppErrorsHandler implements ExceptionFilter {
    private readonly httpAdapterHost;
    constructor(httpAdapterHost: HttpAdapterHost);
    catch(exception: unknown, host: ArgumentsHost): void;
    buildErrorPayload(response: unknown, httpStatusCode: number, url: string, cause: unknown): IAppError;
}
