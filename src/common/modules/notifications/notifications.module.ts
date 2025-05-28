import { Module } from '@nestjs/common';
import { SendNotificationsService } from './providers';

import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config'; 
import { MainDatabaseModule } from 'src/databases/main.database.module';

@Module({
    imports: [MainDatabaseModule, HttpModule, ConfigModule],
    providers: [SendNotificationsService],
    exports: [SendNotificationsService],
})
export class NotificationsModule {}
