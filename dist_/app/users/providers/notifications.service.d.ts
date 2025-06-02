import * as Database from '../../../databases/users/providers';
import { SendNotificationsService } from 'src/common/modules/notifications/providers';
import { PaginationPayloadDto } from 'src/common/apiutils';
import { Notification, NotificationModel } from 'src/databases/users/entities/notifications.schema';
export declare class NotificationsService {
    private readonly notificationModel;
    private usersService;
    private readonly sendNotificationsService;
    constructor(notificationModel: NotificationModel, usersService: Database.UsersService, sendNotificationsService: SendNotificationsService);
    welComeNotification(id: string): Promise<void>;
    generaleNotification(message: string): Promise<void>;
    sendNotiftoUser(id: string, message: string): Promise<void>;
    findUserNotification(idUser: string, pagination: PaginationPayloadDto): Promise<{
        data: Notification[];
        total: number;
    }>;
}
