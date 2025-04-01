import { Injectable } from '@nestjs/common';

import { InjectModel } from '@nestjs/mongoose';
import {
    DATABASE_CONNECTION,
    User,
    USER_MODEL_NAME,
    UserModel,
} from '../../databases/main.database.connection';
import * as Database from '../../databases/users/providers';

@Injectable()
export class UsersService {
    constructor(
        @InjectModel(USER_MODEL_NAME, DATABASE_CONNECTION)
        private userModel: UserModel,
        private usersService: Database.UsersService,
    ) {}

    async updateUserData(id: string, userName: string): Promise<User> {
        const user = await this.usersService.getUser(id);
        user.userName = userName;
        return user.save();
    }
}
