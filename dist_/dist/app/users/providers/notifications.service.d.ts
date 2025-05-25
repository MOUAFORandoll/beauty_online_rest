import * as Database from '../../../databases/users/providers';
import { SendNotificationsService } from 'src/common/modules/notifications/providers';
export declare class NotificationsService {
    private usersService;
    private readonly sendNotificationsService;
    constructor(usersService: Database.UsersService, sendNotificationsService: SendNotificationsService);
    welComeNotification(id: string): Promise<void>;
    generaleNotification(message: string): Promise<void>;
    sendNotiftoUser(id: string, message: string): Promise<void>;
}
