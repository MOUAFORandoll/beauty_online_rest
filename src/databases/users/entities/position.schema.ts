import { ApiProperty } from '@nestjs/swagger';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BaseSchema } from '../../base.schema';
import { Document, Schema as MongooseSchema } from 'mongoose';

import { applySortedMongooseAdditionalFunctions } from '../../base.functions';
import { SERVICES_MODEL_NAME } from 'src/databases/services/entities';
import { USER_MODEL_NAME } from './users.schema';

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
