import { Injectable } from '@nestjs/common';

import {
    DATABASE_CONNECTION,
    POSITION_MODEL_NAME,
    PositionModel,
    User,
} from '../../../databases/main.database.connection';
import * as Database from '../../../databases/users/providers';
import { InjectModel } from '@nestjs/mongoose';
import { UpdateUserDto, UpdateUserPositionDto } from '../dto';
import { StorageService } from 'src/common/modules/external/providers';

@Injectable()
export class UsersService {
    constructor(
        @InjectModel(POSITION_MODEL_NAME, DATABASE_CONNECTION)
        private readonly positionModel: PositionModel,

        private usersService: Database.UsersService,
        private readonly storageService: StorageService,
    ) {}
    async updateUserData(id: string, data: UpdateUserDto): Promise<User> {
        const user = await this.usersService.getUser(id);

        if (data.userName) user.userName = data.userName;
        if (data.phone) user.phone = data.phone;
        if (data.countryCode) user.countryCode = data.countryCode;
        if (data.codePhone) user.codePhone = data.codePhone;
        return user.save();
    }
    async updateUserPhone(
        id: string,
        countryCode: string,
        codePhone: string,
        phone: string,
    ): Promise<User> {
        const user = await this.usersService.getUser(id);
        user.countryCode = countryCode;
        user.codePhone = codePhone;
        user.phone = phone;
        return user.save();
    }

    async updateUserPhoto(photo: Express.Multer.File, id: string): Promise<User> {
        try {
            const user = await this.usersService.getUser(id);

            if (photo) {
                user.pictureUrl = await this.storageService.userProfilePath(
                    photo,
                    user._id.toString(),
                );
            }
            return user.save();
        } catch (error) {
            throw new Error(`Failed to create profile: ${error.message}`);
        }
    }

    async updateUserPosition(user_id: string, dto: UpdateUserPositionDto): Promise<void> {
        const position = new this.positionModel({ ...dto }, user_id);

        await position.save();
    }
    async notificationToken(user_id: string, notification_token: string): Promise<void> {
        const user = await this.usersService.getUser(user_id);

        console.log(notification_token);

        if (notification_token) {
            user.firebaseNotificationToken = notification_token;
        }
        await user.save();
    }
}
