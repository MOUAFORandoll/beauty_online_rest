import { Logger, Module } from '@nestjs/common';

import { UsersModule } from './users/users.module';
import { ConfigModule } from '@nestjs/config';
import { MainDatabaseModule } from './databases/main.database.module';
import { ProfilModule } from './profil_professionnels/profil.module';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            envFilePath: '.env',
        }),
        UsersModule,
        ProfilModule,
        MainDatabaseModule,
    ],
    controllers: [],
    providers: [Logger],
})
export class AppModule {}
