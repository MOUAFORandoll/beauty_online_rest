import { ApiProperty } from '@nestjs/swagger';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { BaseSchema } from '../../base.schema';
import { Document, Model, Schema as MongooseSchema } from 'mongoose';

import { applySortedMongooseAdditionalFunctions } from '../../base.functions';
import { SERVICES_MODEL_NAME } from 'src/databases/services/entities';
import { USER_MODEL_NAME } from './users.schema';

// PROFIL PROFESSIONNEL
export const PROFIL_PRO_MODEL_NAME = 'profils_professionnels';
@Schema({ collection: PROFIL_PRO_MODEL_NAME })
class ProfilProfessionnelSchema extends BaseSchema {
    @ApiProperty()
    @Prop()
    namePro: string;

    @ApiProperty({ type: MongooseSchema.Types.ObjectId })
    @Prop({ type: MongooseSchema.Types.ObjectId, ref: USER_MODEL_NAME })
    user: string;

    @ApiProperty({ type: MongooseSchema.Types.ObjectId })
    @Prop({ type: MongooseSchema.Types.ObjectId, ref: SERVICES_MODEL_NAME })
    service: string;
}
export type ProfilProfessionnelDocument = ProfilProfessionnelSchema & Document;
export type ProfilProfessionnelModel = Model<ProfilProfessionnelSchema>;
export const ProfilProfessionnelsSchema = applySortedMongooseAdditionalFunctions(
    SchemaFactory.createForClass(ProfilProfessionnelSchema),
);
