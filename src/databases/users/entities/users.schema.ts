import { ApiProperty } from '@nestjs/swagger';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BaseSchema } from '../../base.schema';
import { Document } from 'mongoose';

import { applySortedMongooseAdditionalFunctions } from '../../base.functions';

export enum UserType {
    DEFAULT = 'CLIENT',
    PROFESSIONNEL = 'PROFESSIONNEL',
    ADMIN = 'ADMIN',
}

export const USER_MODEL_NAME = 'users';
@Schema({ collection: USER_MODEL_NAME })
class UserSchema extends BaseSchema {
    @ApiProperty()
    @Prop()
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

    @ApiProperty()
    @Prop()
    codePhone: string;

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
    @Prop()
    @ApiProperty({
        type: String,
        description: 'Firebase notification token of the user',
    })
    firebaseNotificationToken: string;
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
