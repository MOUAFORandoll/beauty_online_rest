import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MAIN_DATABASE_CONNECTION, USER_MODEL_NAME, UsersSchema } from './main.database.connection';
import { UsersService } from '../users/providers';

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
            [{ name: USER_MODEL_NAME, schema: UsersSchema }],
            MAIN_DATABASE_CONNECTION,
        ),
    ],
    providers: [UsersService],
    exports: [MongooseModule, UsersService],
})
export class MainDatabaseModule {}
