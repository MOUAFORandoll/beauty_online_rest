import { Logger, Module } from '@nestjs/common';

import { UsersModule } from './users/users.module';
import { ConfigModule } from '@nestjs/config';
import { MainDatabaseModule } from './databases/main.database.module';
import { ProfileModule } from './profile_professionnels/profile.module';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            envFilePath: '.env',
        }),
        UsersModule,
        ProfileModule,
        MainDatabaseModule,
    ],
    controllers: [],
    providers: [Logger],
})
export class AppModule {}
