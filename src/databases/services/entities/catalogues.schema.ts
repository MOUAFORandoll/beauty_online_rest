import { ApiProperty } from '@nestjs/swagger';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BaseSchema } from '../../base.schema';
import { Document, Schema as MongooseSchema } from 'mongoose';

import { applySortedMongooseAdditionalFunctions } from '../../base.functions';
import { PROFIL_PRO_MODEL_NAME, USER_MODEL_NAME } from 'src/databases/users/entities';
import { REALISATION_MODEL_NAME } from './realisations.schema';

// CATALOGUE
export const CATALOGUE_MODEL_NAME = 'catalogues';
@Schema({ collection: CATALOGUE_MODEL_NAME })
class CatalogueSchema extends BaseSchema {
    @Prop({ type: MongooseSchema.Types.ObjectId, ref: PROFIL_PRO_MODEL_NAME })
    profil_professionnel_id: string;

    @Prop({ type: MongooseSchema.Types.ObjectId, ref: REALISATION_MODEL_NAME })
    realisation_id: string;
}
export type CatalogueDocument = CatalogueSchema & Document;
export type CatalogueModel = Model<CatalogueSchema>;
export const CataloguesSchema = applySortedMongooseAdditionalFunctions(
    SchemaFactory.createForClass(CatalogueSchema),
);
// 