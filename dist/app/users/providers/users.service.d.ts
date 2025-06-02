import { PositionModel, User } from '../../../databases/main.database.connection';
import * as Database from '../../../databases/users/providers';
import { UpdateUserDto, UpdateUserPositionDto } from '../dto';
import { StorageService } from 'src/common/modules/external/providers';
export declare class UsersService {
    private readonly positionModel;
    private usersService;
    private readonly storageService;
    constructor(positionModel: PositionModel, usersService: Database.UsersService, storageService: StorageService);
    updateUserData(id: string, data: UpdateUserDto): Promise<User>;
    updateUserPhone(id: string, countryCode: string, codePhone: string, phone: string): Promise<User>;
    updateUserPhoto(photo: Express.Multer.File, id: string): Promise<User>;
    updateUserPosition(user_id: string, dto: UpdateUserPositionDto): Promise<void>;
    notificationToken(user_id: string, notification_token: string): Promise<void>;
}
