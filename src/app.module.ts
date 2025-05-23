import { Logger, MiddlewareConsumer, Module } from '@nestjs/common';

import { UsersModule } from './app/users/users.module';
import { ConfigModule } from '@nestjs/config';
import { MainDatabaseModule } from './databases/main.database.module';
import { ProfileModule } from './app/profile_professionnels/profile.module';
import { RendezVousModule } from './app/rendez_vous/rendez_vous.module';
import { ActuModule } from './app/actu/actu.module';
import HttpLoggerService from './common/logger/providers/http_logger.service';
import { LoggerModule } from './common/logger/logger.module';
import { NotificationsModule } from './common/modules/notifications/notifications.module';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            envFilePath: '.env',
        }),
        LoggerModule,
        NotificationsModule,
        UsersModule,
        ProfileModule,
        RendezVousModule,
        ActuModule,
        MainDatabaseModule,
    ],
    controllers: [],
    providers: [Logger],
})
export class AppModule {
    constructor(private readonly loggerService: HttpLoggerService) {}

    configure(consumer: MiddlewareConsumer): any {
        const loggerService = this.loggerService;
        loggerService.setAppName('MAIN API');
        consumer.apply((req, res, next) => loggerService.use(req, res, next)).forRoutes('{*path}');
    }
}
