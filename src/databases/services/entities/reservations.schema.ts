import { ApiProperty } from '@nestjs/swagger';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BaseSchema } from '../../base.schema';
import { Document, Schema as MongooseSchema } from 'mongoose';

import { applySortedMongooseAdditionalFunctions } from '../../base.functions';
import { USER_MODEL_NAME } from 'src/databases/users/entities';
import { AGENDA_MODEL_NAME } from './agendas.schema'; 
import { REALISATION_MODEL_NAME } from './realisations.schema';

// RESERVATION
export const RESERVATION_MODEL_NAME = 'reservations';
@Schema({ collection: RESERVATION_MODEL_NAME })
class ReservationSchema extends BaseSchema {
    @ApiProperty()
    @Prop()
    timeOfArrival: string;

    @Prop()
    status: string;

    @Prop({ type: MongooseSchema.Types.ObjectId, ref: USER_MODEL_NAME })
    user_id: string;

    @ApiProperty({ type: MongooseSchema.Types.ObjectId })
    @Prop({ type: MongooseSchema.Types.ObjectId, ref: AGENDA_MODEL_NAME })
    agenda_id: string;

    @Prop({ type: MongooseSchema.Types.ObjectId, ref: REALISATION_MODEL_NAME })
    realisation_id: string;
}

export type ReservationDocument = ReservationSchema & Document;
export type ReservationModel = Model<ReservationSchema>;
export const ReservationsSchema = applySortedMongooseAdditionalFunctions(
    SchemaFactory.createForClass(ReservationSchema),
);
