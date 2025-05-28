import { Injectable } from '@nestjs/common';

import * as Database from '../../../databases/users/providers';
import { SendNotificationsService } from 'src/common/modules/notifications/providers';
import { PaginationPayloadDto } from 'src/common/apiutils';
import {
    Notification,
    NOTIFICATION_MODEL_NAME,
    NotificationModel,
} from 'src/databases/users/entities/notifications.schema';
import { InjectModel } from '@nestjs/mongoose';
import { DATABASE_CONNECTION } from 'src/databases/main.database.connection';

@Injectable()
export class NotificationsService {
    constructor(
        @InjectModel(NOTIFICATION_MODEL_NAME, DATABASE_CONNECTION)
        private readonly notificationModel: NotificationModel,
        private usersService: Database.UsersService,
        private readonly sendNotificationsService: SendNotificationsService,
    ) {}
    async welComeNotification(id: string) {
        const user = await this.usersService.getUser(id);
        await this.sendNotificationsService.sendWelcome(user);
    }
    async generaleNotification(message: string) {
        const users = await this.usersService.getAllUsers();
        for (const user of users) {
            await this.sendNotificationsService.sendGeneral(user, message);
        }
    }
    async sendNotiftoUser(id: string, message: string) {
        const user = await this.usersService.getUser(id);
        await this.sendNotificationsService.sendInformation(user, message);
    }
    /**
     * Find all realisations for a user
     * @param user_id The user ID
     * @param pagination Pagination options
     * @returns Paginated realisations with their files
     */
    async findUserNotification(
        idUser: string,
        pagination: PaginationPayloadDto,
    ): Promise<{ data: Notification[]; total: number }> {
        const [data, total] = await Promise.all([
            this.notificationModel
                .find({ user_id: idUser })
                .sort({ createdAt: -1 }) // Sort by newest first
                .skip((pagination.page - 1) * pagination.size)
                .limit(pagination.size)
                .exec(),
            this.notificationModel.countDocuments({ user_id: idUser }).exec(),
        ]);

        return { data, total };
    }
}
