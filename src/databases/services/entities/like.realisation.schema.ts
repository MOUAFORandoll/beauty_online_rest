import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BaseSchema } from '../../base.schema';
import { Document, Schema as MongooseSchema } from 'mongoose';

import { applySortedMongooseAdditionalFunctions } from '../../base.functions';
import { USER_MODEL_NAME } from 'src/databases/users/entities';
import { REALISATION_MODEL_NAME } from './realisations.schema';

// SHARE
export const LIKE_REALISATION_MODEL_NAME = 'like_realisation';
@Schema({ collection: LIKE_REALISATION_MODEL_NAME })
class LikeRealisationSchema extends BaseSchema {
    @Prop({ type: MongooseSchema.Types.ObjectId, ref: USER_MODEL_NAME })
    user_id: string;
    @Prop({ type: MongooseSchema.Types.ObjectId, ref: REALISATION_MODEL_NAME })
    realisation_id: string;
}
export type LikeRealisation = LikeRealisationSchema & Document;
export type LikeRealisationModel = Model<LikeRealisationSchema>;
export const LikeRealisationsSchema = applySortedMongooseAdditionalFunctions(
    SchemaFactory.createForClass(LikeRealisationSchema),
);
