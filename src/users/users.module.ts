import { Module } from '@nestjs/common';
import { AuthController, UsersController } from './controllers';
import { AuthClientGuard, AuthFirebaseService, AuthService, UsersService } from './providers';
import { APP_GUARD } from '@nestjs/core';
import { MainDatabaseModule } from '../databases/main/main.database.module';
import { AwsModule } from '../common/modules/aws/aws.module';
import { SubscriptionService } from '../subscriptions/providers';

@Module({
    imports: [MainDatabaseModule, AwsModule],
    providers: [
        AuthFirebaseService,
        UsersService,
        AuthService,
        SubscriptionService,
        {
            provide: APP_GUARD,
            useClass: AuthClientGuard,
        },
    ],
    controllers: [AuthController, UsersController],
    exports: [AuthFirebaseService, UsersService, SubscriptionService, AuthService],
})
export class UsersModule {}
