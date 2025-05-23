import { Module } from '@nestjs/common';
import { AuthController, UsersController } from './controllers';
import { AuthClientGuard, AuthFirebaseService, AuthService, UsersService } from './providers';
import { APP_GUARD } from '@nestjs/core';
import { MainDatabaseModule } from '../../databases/main.database.module';
import { AwsModule } from '../../common/modules/aws/aws.module';
import { NotificationsModule } from '../../common/modules/notifications/notifications.module';

@Module({
    imports: [MainDatabaseModule, AwsModule, NotificationsModule],
    providers: [
        AuthFirebaseService,

        UsersService,
        AuthService,
        {
            provide: APP_GUARD,
            useClass: AuthClientGuard,
        },
    ],
    controllers: [AuthController, UsersController],
    exports: [AuthFirebaseService, UsersService, AuthService],
})
export class UsersModule {}
