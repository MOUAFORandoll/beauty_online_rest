import { ApiProperty } from '@nestjs/swagger';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BaseSchema } from '../../base.schema';
import { Document, Schema as MongooseSchema } from 'mongoose';

import { applySortedMongooseAdditionalFunctions } from '../../base.functions';
import { PROFIL_PRO_MODEL_NAME, USER_MODEL_NAME } from 'src/databases/users/entities';
 
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
