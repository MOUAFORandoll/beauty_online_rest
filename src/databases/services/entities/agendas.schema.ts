
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BaseSchema } from '../../base.schema';
import { Document, Schema as MongooseSchema } from 'mongoose';

import { applySortedMongooseAdditionalFunctions } from '../../base.functions';
import { PROFILE_PRO_MODEL_NAME } from 'src/databases/users/entities';

console.log('PROFILE_PRO_MODEL_NAME:', PROFILE_PRO_MODEL_NAME);

// AGENDA
export const AGENDA_MODEL_NAME = 'agendas';
@Schema({ collection: AGENDA_MODEL_NAME })
class AgendaSchema extends BaseSchema {
    @Prop()
    day: Date;

    @Prop()
    startTimeAvailable: string;

    @Prop()
    endTimeAvailable: string;

    @Prop({
        type: MongooseSchema.Types.ObjectId,
        ref: PROFILE_PRO_MODEL_NAME,
    })
    profile_professionnel_id: string;
}
export type AgendaDocument = AgendaSchema & Document;
export type AgendaModel = Model<AgendaSchema>;
export const AgendasSchema = applySortedMongooseAdditionalFunctions(
    SchemaFactory.createForClass(AgendaSchema),
);
