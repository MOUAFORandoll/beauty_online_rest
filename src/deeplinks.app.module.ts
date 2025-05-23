import { Logger, MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { DeepLinksModule } from './deeplinks/deeplinks.module';
import { DATABASE_CONNECTION } from './databases/main.database.connection';
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
