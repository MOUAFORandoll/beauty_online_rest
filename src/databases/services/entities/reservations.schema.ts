import { ApiProperty } from '@nestjs/swagger';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BaseSchema } from '../../base.schema';
import { Document, Schema as MongooseSchema } from 'mongoose';

import { applySortedMongooseAdditionalFunctions } from '../../base.functions';
import { PROFIL_PRO_MODEL_NAME, USER_MODEL_NAME } from 'src/databases/users/entities';
import { AGENDA_MODEL_NAME } from './agendas.schema';
import { CATALOGUE_MODEL_NAME } from './catalogues.schema';
 

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

    @ApiProperty({ type: MongooseSchema.Types.ObjectId })
    @Prop({ type: MongooseSchema.Types.ObjectId, ref: CATALOGUE_MODEL_NAME })
    catalogue_id: string;
}

export type ReservationDocument = ReservationSchema & Document;
export type ReservationModel = Model<ReservationSchema>;
export const ReservationsSchema = applySortedMongooseAdditionalFunctions(
    SchemaFactory.createForClass(ReservationSchema),
);
