import { ApiProperty } from '@nestjs/swagger';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BaseSchema } from '../../base.schema';
import { Document, Schema as MongooseSchema } from 'mongoose';

import { applySortedMongooseAdditionalFunctions } from '../../base.functions';
import { PROFIL_PRO_MODEL_NAME, USER_MODEL_NAME } from 'src/databases/users/entities';

// SERVICES
export const SERVICES_MODEL_NAME = 'services';
@Schema({ collection: SERVICES_MODEL_NAME })
class ServiceSchema extends BaseSchema {
    @Prop()
    label: string;
}
export type ServicesDocument = ServiceSchema & Document;
export type ServicesModel = Model<ServiceSchema>;
export const ServicesSchema = applySortedMongooseAdditionalFunctions(
    SchemaFactory.createForClass(ServiceSchema),
);

// REALISATION
export const REALISATION_MODEL_NAME = 'realisations';
@Schema({ collection: REALISATION_MODEL_NAME })
class RealisationSchema extends BaseSchema {
    @Prop()
    title: string;

    @Prop()
    image_path: string;
}
export type RealisationDocument = RealisationSchema & Document;
export type RealisationModel = Model<RealisationSchema>;
export const RealisationsSchema = applySortedMongooseAdditionalFunctions(
    SchemaFactory.createForClass(RealisationSchema),
);

// CATALOGUE
export const CATALOGUE_MODEL_NAME = 'catalogues';
@Schema({ collection: CATALOGUE_MODEL_NAME })
class CatalogueSchema extends BaseSchema {
    @Prop({ type: MongooseSchema.Types.ObjectId, ref: PROFIL_PRO_MODEL_NAME })
    profilProfessionnel: string;

    @Prop({ type: MongooseSchema.Types.ObjectId, ref: REALISATION_MODEL_NAME })
    realisation: string;
}
export type CatalogueDocument = RealisationSchema & Document;
export type CatalogueModel = Model<RealisationSchema>;
export const CataloguesSchema = applySortedMongooseAdditionalFunctions(
    SchemaFactory.createForClass(RealisationSchema),
);

// AGENDA
export const AGENDA_MODEL_NAME = 'agendas';
@Schema({ collection: AGENDA_MODEL_NAME })
class AgendaSchema extends BaseSchema {
    @Prop()
    day: Date;

    @Prop()
    startTimeAvailable: string;

    @ApiProperty()
    @Prop()
    endTimeAvailable: string;
    @ApiProperty({ type: MongooseSchema.Types.ObjectId })
    @Prop({ type: MongooseSchema.Types.ObjectId, ref: PROFIL_PRO_MODEL_NAME })
    profilProfessionnel: string;
}
export type AgendaDocument = AgendaSchema & Document;
export type AgendaModel = Model<AgendaSchema>;
export const AgendasSchema = applySortedMongooseAdditionalFunctions(
    SchemaFactory.createForClass(AgendaSchema),
);

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
    user: string;

    @ApiProperty({ type: MongooseSchema.Types.ObjectId })
    @Prop({ type: MongooseSchema.Types.ObjectId, ref: AGENDA_MODEL_NAME })
    agenda: string;

    @ApiProperty({ type: MongooseSchema.Types.ObjectId })
    @Prop({ type: MongooseSchema.Types.ObjectId, ref: CATALOGUE_MODEL_NAME })
    catalogue: string;
}

export type ReservationDocument = ReservationSchema & Document;
export type ReservationModel = Model<ReservationSchema>;
export const ReservationsSchema = applySortedMongooseAdditionalFunctions(
    SchemaFactory.createForClass(ReservationSchema),
);
