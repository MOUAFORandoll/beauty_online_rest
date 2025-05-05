import { ApiProperty } from '@nestjs/swagger';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BaseSchema } from '../../base.schema';
import { Document, Schema as MongooseSchema } from 'mongoose';

import { applySortedMongooseAdditionalFunctions } from '../../base.functions';
import { USER_MODEL_NAME } from './users.schema';
import { PROFILE_PRO_MODEL_NAME } from './profile_professionnel.schema';

// POSITION
export const POSITION_MODEL_NAME = 'positions';
@Schema({ collection: POSITION_MODEL_NAME })
class PositionSchema extends BaseSchema {
    @ApiProperty()
    @Prop()
    longitude: string;

    @ApiProperty()
    @Prop()
    latitude: string;

    @ApiProperty()
    @Prop()
    country: string;

    @ApiProperty()
    @Prop()
    town: string;
    @ApiProperty()
    @Prop()
    titleEmplacement: string;

    @ApiProperty({ type: MongooseSchema.Types.ObjectId })
    @Prop({ type: MongooseSchema.Types.ObjectId, ref: USER_MODEL_NAME })
    user_id: string;

    @ApiProperty({ type: MongooseSchema.Types.ObjectId })
    @Prop({ type: MongooseSchema.Types.ObjectId, ref: PROFILE_PRO_MODEL_NAME })
    profile_professionnel_id: string;
}
export type Position = PositionSchema & Document;
export type PositionModel = Model<PositionSchema>;
export const PositionsSchema = applySortedMongooseAdditionalFunctions(
    SchemaFactory.createForClass(PositionSchema),
);
