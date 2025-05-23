import { InjectModel } from '@nestjs/mongoose';
import { User, USER_MODEL_NAME, UserModel } from '../entities';
import { Injectable, NotFoundException } from '@nestjs/common';
import { DATABASE_CONNECTION } from 'src/databases/main.database.connection';
import { UserErrors } from 'src/app/users/errors';

@Injectable()
export class UsersService {
    constructor(
        @InjectModel(USER_MODEL_NAME, DATABASE_CONNECTION)
        protected userModel: UserModel,
    ) {}

    async getUser(id: string): Promise<User> {
        const user = await this.userModel.findOne({ _id: id }).exec();

        if (user == null) throw new NotFoundException(UserErrors['USER_NOT_FOUND']);
        return user;
    }
}
