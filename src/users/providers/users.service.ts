import { Injectable } from '@nestjs/common';

import {
    DATABASE_CONNECTION,
    POSITION_MODEL_NAME,
    PositionModel,
    User,
} from '../../databases/main.database.connection';
import * as Database from '../../databases/users/providers';
import { InjectModel } from '@nestjs/mongoose';
import { UpdateUserDto, UpdateUserPositionDto } from '../dto';

@Injectable()
export class UsersService {
    constructor(
        @InjectModel(POSITION_MODEL_NAME, DATABASE_CONNECTION)
        private readonly positionModel: PositionModel,

        private usersService: Database.UsersService,
    ) {}
    async updateUserData(id: string, data: UpdateUserDto): Promise<User> {
        const user = await this.usersService.getUser(id);
        if (data.userName) user.userName = data.userName;
        if (data.phone) user.phone = data.phone;
        if (data.countryCode) user.countryCode = data.countryCode;
        return user.save();
    }
    async updateUserPhone(id: string, countryCode: string, phone: string): Promise<User> {
        const user = await this.usersService.getUser(id);
        user.countryCode = countryCode;
        user.phone = phone;
        return user.save();
    }
    async updateUserPosition(user_id: string, dto: UpdateUserPositionDto): Promise<void> {
        const position = new this.positionModel({ ...dto }, user_id);

        await position.save();
    }
}
