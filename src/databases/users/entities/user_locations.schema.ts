import { ApiProperty } from '@nestjs/swagger';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BaseSchema } from '../../base.schema';
import { Document, Schema as MongooseSchema } from 'mongoose';

import { applySortedMongooseAdditionalFunctions } from '../../base.functions';
import { POSITION_MODEL_NAME } from './position.schema';
import { USER_MODEL_NAME } from './users.schema';

// PROFIL PROFESSIONNEL
export const USER_LOCATION_MODEL_NAME = 'user_locations';
@Schema({ collection: USER_LOCATION_MODEL_NAME })
class UserLocationSchema extends BaseSchema {
    @ApiProperty({ type: MongooseSchema.Types.ObjectId })
    @Prop({ type: MongooseSchema.Types.ObjectId, ref: USER_MODEL_NAME })
    user_id: string;

    @ApiProperty({ type: MongooseSchema.Types.ObjectId })
    @Prop({ type: MongooseSchema.Types.ObjectId, ref: POSITION_MODEL_NAME })
    position_id: string;
}
export type UserLocationDocument = UserLocationSchema & Document;
export type UserLocationModel = Model<UserLocationSchema>;
export const UserLocalisationsSchema = applySortedMongooseAdditionalFunctions(
    SchemaFactory.createForClass(UserLocationSchema),
);
