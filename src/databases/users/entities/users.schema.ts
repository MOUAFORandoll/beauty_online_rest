import { ApiProperty } from '@nestjs/swagger';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Model } from 'mongoose';
import { BaseSchema } from '../../main/base.schema';
import { applySortedMongooseAdditionalFunctions } from '../../main/base.functions';
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
    @ApiProperty({
        type: String,
        description: 'fullName of the user',
    })
    @Prop()
    fullName: string;

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
    @Prop({ required: true })
    email: string;

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
    SchemaFactory.createForClass(UserSchema)
);
