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

// POSITION
export const POSITION_MODEL_NAME = 'positions';
@Schema({ collection: POSITION_MODEL_NAME })
class PositionSchema extends BaseSchema {
    @ApiProperty()
    @Prop()
    longitude: number;

    @ApiProperty()
    @Prop()
    latitude: number;

    @ApiProperty()
    @Prop()
    country: string;

    @ApiProperty()
    @Prop()
    town: string;
}
export type PositionDocument = PositionSchema & Document;
export type PositionModel = Model<PositionSchema>;
export const PositionsSchema = applySortedMongooseAdditionalFunctions(
    SchemaFactory.createForClass(PositionSchema),
);

// PROFIL PROFESSIONNEL
export const PROFIL_PRO_MODEL_NAME = 'profils_professionnels';
@Schema({ collection: PROFIL_PRO_MODEL_NAME })
class ProfilProfessionnelSchema extends BaseSchema {
    @ApiProperty()
    @Prop()
    namePro: string;

    @ApiProperty({ type: MongooseSchema.Types.ObjectId })
    @Prop({ type: MongooseSchema.Types.ObjectId, ref: USER_MODEL_NAME })
    user: string;

    @ApiProperty({ type: MongooseSchema.Types.ObjectId })
    @Prop({ type: MongooseSchema.Types.ObjectId, ref: SERVICES_MODEL_NAME })
    service: string;
}
export type ProfilProfessionnelDocument = ProfilProfessionnelSchema & Document;
export type ProfilProfessionnelModel = Model<ProfilProfessionnelSchema>;
export const ProfilProfessionnelsSchema = applySortedMongooseAdditionalFunctions(
    SchemaFactory.createForClass(ProfilProfessionnelSchema),
);

// PROFIL PROFESSIONNEL
export const USER_LOCATION_MODEL_NAME = 'user_locations';
@Schema({ collection: USER_LOCATION_MODEL_NAME })
class UserLocationSchema extends BaseSchema {
    @ApiProperty({ type: MongooseSchema.Types.ObjectId })
    @Prop({ type: MongooseSchema.Types.ObjectId, ref: USER_MODEL_NAME })
    user: string;

    @ApiProperty({ type: MongooseSchema.Types.ObjectId })
    @Prop({ type: MongooseSchema.Types.ObjectId, ref: POSITION_MODEL_NAME })
    position: string;
}
export type UserLocationDocument = UserLocationSchema & Document;
export type UserLocationModel = Model<UserLocationSchema>;
export const UserLocalisationsSchema = applySortedMongooseAdditionalFunctions(
    SchemaFactory.createForClass(UserLocationSchema),
);
