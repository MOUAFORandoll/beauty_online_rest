import { MiddlewareConsumer } from '@nestjs/common';
import HttpLoggerService from './common/logger/providers/http_logger.service';
export declare class StreamAppModule {
    private readonly loggerService;
    constructor(loggerService: HttpLoggerService);
    configure(consumer: MiddlewareConsumer): any;
}
