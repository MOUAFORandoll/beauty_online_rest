import { Module } from '@nestjs/common';
import { SendNotificationsService } from './providers';

import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';
@Module({
    imports: [HttpModule, ConfigModule],
    providers: [SendNotificationsService],
    exports: [SendNotificationsService],
})
export class NotificationsModule {}
