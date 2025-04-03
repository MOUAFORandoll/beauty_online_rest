import { ApiProperty } from '@nestjs/swagger';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BaseSchema } from '../../base.schema';
import { Document, Schema as MongooseSchema } from 'mongoose';

import { applySortedMongooseAdditionalFunctions } from '../../base.functions';
import { USER_MODEL_NAME } from 'src/databases/users/entities';
import { AGENDA_MODEL_NAME } from './agendas.schema';
import { REALISATION_MODEL_NAME } from './realisations.schema';

// RENDEZ_VOUS
export const RENDEZ_VOUS_MODEL_NAME = 'rendez_vous';
@Schema({ collection: RENDEZ_VOUS_MODEL_NAME })
class RendezVousSchema extends BaseSchema {
    @ApiProperty()
    @Prop()
    timeOfArrival: string;

    @Prop()
    status: boolean;

    @Prop({ type: MongooseSchema.Types.ObjectId, ref: USER_MODEL_NAME })
    user_id: string;

    @ApiProperty({ type: MongooseSchema.Types.ObjectId })
    @Prop({ type: MongooseSchema.Types.ObjectId, ref: AGENDA_MODEL_NAME })
    agenda_id: string;

    @Prop({ type: MongooseSchema.Types.ObjectId, ref: REALISATION_MODEL_NAME })
    realisation_id: string;
}

export type RendezVous = RendezVousSchema & Document;
export type RendezVousModel = Model<RendezVousSchema>;
export const RendezVoussSchema = applySortedMongooseAdditionalFunctions(
    SchemaFactory.createForClass(RendezVousSchema),
);
