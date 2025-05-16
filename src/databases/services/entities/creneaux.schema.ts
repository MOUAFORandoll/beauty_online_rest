import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BaseSchema } from '../../base.schema';
import { Document, Schema as MongooseSchema } from 'mongoose';

import { applySortedMongooseAdditionalFunctions } from '../../base.functions';
import { AGENDA_MODEL_NAME } from './agendas.schema';
// creneau
export const CRENEAU_MODEL_NAME = 'creneaux';
@Schema({ collection: CRENEAU_MODEL_NAME })
class CreneauSchema extends BaseSchema {
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
export type Creneau = CreneauSchema & Document;
export type CreneauModel = Model<CreneauSchema>;
export const CreneauxSchema = applySortedMongooseAdditionalFunctions(
    SchemaFactory.createForClass(CreneauSchema),
);
