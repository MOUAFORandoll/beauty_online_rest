
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BaseSchema } from '../../base.schema';
import { Document, Schema as MongooseSchema } from 'mongoose';

import { applySortedMongooseAdditionalFunctions } from '../../base.functions';
import { PROFILE_PRO_MODEL_NAME } from 'src/databases/users/entities';

// REALISATION
export const REALISATION_MODEL_NAME = 'realisations';
@Schema({ collection: REALISATION_MODEL_NAME })
class RealisationSchema extends BaseSchema {
    @Prop()
    title: string;

    @Prop()
    image_path: string;
  
    @Prop({ type: MongooseSchema.Types.ObjectId, ref: PROFILE_PRO_MODEL_NAME })
    profile_professionnel_id: string;
}
export type Realisation  = RealisationSchema & Document;
export type RealisationModel = Model<RealisationSchema>;
export const RealisationsSchema = applySortedMongooseAdditionalFunctions(
    SchemaFactory.createForClass(RealisationSchema),
);
