import { Logger, MiddlewareConsumer, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { LoggerModule } from './common/logger/logger.module';
import HttpLoggerService from './common/logger/providers/http_logger.service';
import { MainDatabaseModule } from './databases/main.database.module';
import { StreamModule } from './stream/stream.module';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            envFilePath: '.env',
        }),

        LoggerModule,
        StreamModule,
        MainDatabaseModule,
    ],
    providers: [Logger],
})
export class StreamAppModule {
    constructor(private readonly loggerService: HttpLoggerService) {}

    configure(consumer: MiddlewareConsumer): any {
        const loggerService = this.loggerService;
        loggerService.setAppName('Stream');
        consumer.apply(HttpLoggerService).forRoutes('*');
    }
}
