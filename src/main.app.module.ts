import { Logger, Module } from '@nestjs/common';

import { UsersModule } from './users/users.module';
import { ConfigModule } from '@nestjs/config';
import { ApplicationModule } from './applications/application.module';
import { MainDatabaseModule } from './databases/main/main.database.module';
import { LinksModule } from './links/links.module';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            envFilePath: '.env',
        }),
        UsersModule,
      
    ],
    controllers: [],
    providers: [Logger],
})
export class MainAppModule {}
