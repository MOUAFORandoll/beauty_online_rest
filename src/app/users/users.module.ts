import { Module } from '@nestjs/common';
import { AuthController, UsersController, NotificationsController } from './controllers';
import {
    AuthClientGuard,
    AuthFirebaseService,
    AuthService,
    UsersService,
    NotificationsService,
} from './providers';
import { APP_GUARD } from '@nestjs/core';
import { MainDatabaseModule } from '../../databases/main.database.module';
import { ExternalModule } from '../../common/modules/external/external.module';
import { NotificationsModule } from '../../common/modules/notifications/notifications.module';

@Module({
    imports: [MainDatabaseModule, ExternalModule, NotificationsModule],
    providers: [
        AuthFirebaseService,

        UsersService,
        AuthService,
        NotificationsService,
        {
            provide: APP_GUARD,
            useClass: AuthClientGuard,
        },
    ],
    controllers: [AuthController, UsersController, NotificationsController],
    exports: [AuthFirebaseService, UsersService, AuthService, NotificationsService],
})
export class UsersModule {}
