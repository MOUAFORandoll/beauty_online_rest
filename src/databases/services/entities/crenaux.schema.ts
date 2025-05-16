import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BaseSchema } from '../../base.schema';
import { Document, Schema as MongooseSchema } from 'mongoose';

import { applySortedMongooseAdditionalFunctions } from '../../base.functions';
import { AGENDA_MODEL_NAME } from './agendas.schema';
// AGENDA
export const CRENAU_MODEL_NAME = 'crenaux';
@Schema({ collection: CRENAU_MODEL_NAME })
class CrenauSchema extends BaseSchema {
    @Prop()
    startTimeAvailable: string;

    @Prop()
    endTimeAvailable: string;

    @Prop({
        type: MongooseSchema.Types.ObjectId,
        ref: AGENDA_MODEL_NAME,
    })
    agenda_id: string;
    
}
export type Crenau = CrenauSchema & Document;
export type CrenauModel = Model<CrenauSchema>;
export const CrenauxSchema = applySortedMongooseAdditionalFunctions(
    SchemaFactory.createForClass(CrenauSchema),
);
