import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import {
    APPLICATION_MODEL_NAME,
    ApplicationsSchema,
    CLICK_MODEL_NAME,
    ClicksSchema,
    LINK_MODEL_NAME,
    LinksSchema,
    MAIN_DATABASE_CONNECTION,
    PAYMENT_MODEL_NAME,
    PaymentsSchema,
    PLATFORM_MODEL_NAME,
    PlatformsSchema,
    SUBSCRIPTION_MODEL_NAME,
    SUBSCRIPTION_PLAN_MODEL_NAME,
    SubscriptionPlansSchema,
    SubscriptionsSchema,
    USER_MODEL_NAME,
    UsersSchema,
} from './main.database.connection';
import { ApplicationsService, LinksService, PlatformsService } from '../providers';
import { UsersService } from '../users/providers';
import { SubscriptionsService } from './subscriptions/providers';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            envFilePath: '.env',
        }),
        MongooseModule.forRootAsync({
            imports: [ConfigModule],
            useFactory: (configService: ConfigService) => ({
                uri: configService.get('MONGO_URI'),
            }),
            inject: [ConfigService],
            connectionName: MAIN_DATABASE_CONNECTION,
        }),
        MongooseModule.forFeature(
            [
                { name: APPLICATION_MODEL_NAME, schema: ApplicationsSchema },
                { name: PLATFORM_MODEL_NAME, schema: PlatformsSchema },
                { name: LINK_MODEL_NAME, schema: LinksSchema },

                { name: CLICK_MODEL_NAME, schema: ClicksSchema },

                { name: PAYMENT_MODEL_NAME, schema: PaymentsSchema },
                { name: SUBSCRIPTION_MODEL_NAME, schema: SubscriptionsSchema },
                { name: SUBSCRIPTION_PLAN_MODEL_NAME, schema: SubscriptionPlansSchema },

                { name: USER_MODEL_NAME, schema: UsersSchema },
            ],
            MAIN_DATABASE_CONNECTION,
        ),
    ],
    providers: [
        ApplicationsService,
        LinksService,
        PlatformsService,
        SubscriptionsService,
        UsersService,
    ],
    exports: [
        MongooseModule,
        ApplicationsService,
        LinksService,
        PlatformsService,
        SubscriptionsService,
        UsersService,
    ],
})
export class MainDatabaseModule {}
