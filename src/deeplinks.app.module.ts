import { Logger, MiddlewareConsumer, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DeepLinksModule } from './deeplinks/deeplinks.module';
import { LoggerModule } from './common/logger/logger.module';
import HttpLoggerService from './common/logger/providers/http_logger.service';
import { MainDatabaseModule } from './databases/main.database.module';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            envFilePath: '.env',
        }),

        LoggerModule,
        DeepLinksModule,
        MainDatabaseModule,
    ],
    providers: [Logger],
})
export class DeepLinksAppModule {
    constructor(private readonly loggerService: HttpLoggerService) {}

    configure(consumer: MiddlewareConsumer): any {
        const loggerService = this.loggerService;
        loggerService.setAppName('DeepLink');
        consumer.apply(HttpLoggerService).forRoutes('*');
    }
}
