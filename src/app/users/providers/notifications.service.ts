import { Injectable } from '@nestjs/common';

import * as Database from '../../../databases/users/providers';
import { SendNotificationsService } from 'src/common/modules/notifications/providers';

@Injectable()
export class NotificationsService {
    constructor(
        private usersService: Database.UsersService,
        private readonly sendNotificationsService: SendNotificationsService,
    ) {}
    async welComeNotification(id: string) {
        const user = await this.usersService.getUser(id);
        await this.sendNotificationsService.welComeNotification(user);
    }
    async generaleNotification(message: string) {
        const users = await this.usersService.getAllUsers();
        for (const user of users) {
            await this.sendNotificationsService.sendGeneralNotification(user, message);
        }
    }
    async sendNotiftoUser(id: string, message: string) {
        const user = await this.usersService.getUser(id);
        await this.sendNotificationsService.sendInformation(user, message);
    }
}
