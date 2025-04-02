import { ApiProperty } from '@nestjs/swagger';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { BaseSchema } from '../../base.schema';
import { Document, Model, Schema as MongooseSchema } from 'mongoose';

import { applySortedMongooseAdditionalFunctions } from '../../base.functions';
// import { SERVICES_MODEL_NAME } from 'src/databases/services/entities';
import { USER_MODEL_NAME } from './users.schema';
export enum ServiceType {
    COIFFURE = 'COIFFURE',
    MANICURE = 'MANICURE',
}

export const PROFILE_PRO_MODEL_NAME = 'profiles_professionnels';
// PROFILE PROFESSIONNEL
@Schema({ collection: PROFILE_PRO_MODEL_NAME })
class ProfileProfessionnelSchema extends BaseSchema {
    @ApiProperty()
    @Prop()
    namePro: string;

    @ApiProperty({ type: MongooseSchema.Types.ObjectId })
    @Prop({ type: MongooseSchema.Types.ObjectId, ref: USER_MODEL_NAME })
    user_id: string;

    @Prop({ type: String, enum: ServiceType })
    service: string;
}
export type ProfileProfessionnel = ProfileProfessionnelSchema & Document;
export type ProfileProfessionnelModel = Model<ProfileProfessionnelSchema>;
export const ProfileProfessionnelsSchema = applySortedMongooseAdditionalFunctions(
    SchemaFactory.createForClass(ProfileProfessionnelSchema),
);
