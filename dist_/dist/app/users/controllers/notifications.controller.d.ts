import { GeneralNotificationDto, ParticularNotificationDto } from '../dto';
import * as Database from '../../../databases/users/providers';
import { SendNotificationsService } from 'src/common/modules/notifications/providers';
import { NotificationsService } from '../providers/notifications.service';
export declare class NotificationsController {
    private readonly notificationsService;
    private readonly dbUsersService;
    private readonly sendNotificationsService;
    constructor(notificationsService: NotificationsService, dbUsersService: Database.UsersService, sendNotificationsService: SendNotificationsService);
    sendWelcomeNotification(userId: string): Promise<void>;
    sendGeneralNotification(body: GeneralNotificationDto): Promise<void>;
    sendNotificationToUser(body: ParticularNotificationDto): Promise<void>;
}
