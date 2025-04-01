import { ApiProperty } from '@nestjs/swagger';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BaseSchema } from '../../base.schema';
import { Document, Schema as MongooseSchema } from 'mongoose';

import { applySortedMongooseAdditionalFunctions } from '../../base.functions';
import { SERVICES_MODEL_NAME } from 'src/databases/services/entities';
export enum UserStatus {
    PENDING_REGISTRATION = 'PENDING_REGISTRATION',
    ACTIVE = 'ACTIVE',
    BLOCKED = 'BLOCKED',
}

export enum UserType {
    DEFAULT = 'DEFAULT',
    ADMIN = 'ADMIN',
}

export const USER_MODEL_NAME = 'users';
@Schema({ collection: USER_MODEL_NAME })
class UserSchema extends BaseSchema {
    @ApiProperty()
    @Prop({ required: true })
    userName: string;

    @ApiProperty()
    @Prop({ required: true })
    email: string;

    @ApiProperty()
    @Prop()
    phone: string;

    @ApiProperty()
    @Prop()
    countryCode: string;

    @Prop({ type: String, enum: UserType })
    typeUser: string;

    @ApiProperty({
        type: String,
        description: 'Picture of the user',
    })
    @Prop()
    pictureUrl: string;

    @Prop()
    @ApiProperty({
        type: String,
        description: 'Firebase identifiant of the user',
    })
    firebaseUID: string;

    @ApiProperty({
        type: String,
        description: 'Email address of the user',
    })
    @ApiProperty({
        type: String,
        description: 'authProvider of the user',
    })
    @Prop()
    authProvider: string;
}

export type User = UserSchema & Document;
export type UserModel = Model<UserSchema>;
export const UsersSchema = applySortedMongooseAdditionalFunctions(
    SchemaFactory.createForClass(UserSchema),
);
 