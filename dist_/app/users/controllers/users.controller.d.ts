import { UsersService } from '../providers';
import { UpdateUserDto, UpdateUserPositionDto, UserDto } from '../dto';
import * as Database from '../../../databases/users/providers';
import { SendNotificationsService } from 'src/common/modules/notifications/providers';
export declare class UsersController {
    private readonly usersService;
    private readonly dbUsersService;
    private readonly sendNotificationsService;
    constructor(usersService: UsersService, dbUsersService: Database.UsersService, sendNotificationsService: SendNotificationsService);
    findOneUser(id: string): Promise<UserDto | null>;
    findAllUser(): Promise<UserDto[]>;
    sendNotif(): Promise<void>;
    updateUserData(id: string, payload: UpdateUserDto): Promise<UserDto>;
    updateUserPicture(id: string, image?: Express.Multer.File): Promise<UserDto>;
    updateUserPosition(id: string, payload: UpdateUserPositionDto): Promise<void>;
    notificationToken(id: string, payload: {
        notification_token: string;
    }): Promise<void>;
}
