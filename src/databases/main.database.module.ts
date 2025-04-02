import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import {
    DATABASE_CONNECTION,
    USER_MODEL_NAME,
    UsersSchema,
    POSITION_MODEL_NAME,
    PositionsSchema,
    PROFILE_PRO_MODEL_NAME,
    ProfileProfessionnelsSchema,
    USER_LOCATION_MODEL_NAME,
    UserLocalisationsSchema,
    REALISATION_MODEL_NAME,
    RealisationsSchema,
    AGENDA_MODEL_NAME,
    AgendasSchema,
    RESERVATION_MODEL_NAME,
    ReservationsSchema,
} from './main.database.connection';
import { UsersService } from './users/providers';
console.log('PROFILE_PRO_MODEL_NAMEdddd:', PROFILE_PRO_MODEL_NAME);

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
            connectionName: DATABASE_CONNECTION,
        }),
        MongooseModule.forFeature(
            [
                { name: USER_MODEL_NAME, schema: UsersSchema },
                { name: POSITION_MODEL_NAME, schema: PositionsSchema },
                { name: PROFILE_PRO_MODEL_NAME, schema: ProfileProfessionnelsSchema },
                { name: USER_LOCATION_MODEL_NAME, schema: UserLocalisationsSchema },
                { name: REALISATION_MODEL_NAME, schema: RealisationsSchema },
                { name: AGENDA_MODEL_NAME, schema: AgendasSchema },
                { name: RESERVATION_MODEL_NAME, schema: ReservationsSchema },
            ],
            DATABASE_CONNECTION,
        ),
    ],
    providers: [UsersService],
    exports: [MongooseModule, UsersService],
})
export class MainDatabaseModule {}
