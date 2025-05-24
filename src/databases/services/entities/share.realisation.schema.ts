import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BaseSchema } from '../../base.schema';
import { Document, Schema as MongooseSchema } from 'mongoose';

import { applySortedMongooseAdditionalFunctions } from '../../base.functions';
import { USER_MODEL_NAME } from 'src/databases/users/entities';
import { REALISATION_MODEL_NAME } from './realisations.schema';

// SHARE
export const SHARE_REALISATION_MODEL_NAME = 'share_realisation';
@Schema({ collection: SHARE_REALISATION_MODEL_NAME })
class  ShareRealisationSchema extends BaseSchema {
    @Prop({ type: MongooseSchema.Types.ObjectId, ref: USER_MODEL_NAME })
    user_id: string;
    @Prop({ type: MongooseSchema.Types.ObjectId, ref: REALISATION_MODEL_NAME })
    realisation_id: string;
}
export type  ShareRealisation = ShareRealisationSchema & Document;
export type ShareRealisationModel = Model<ShareRealisationSchema>;
export const ShareRealisationsSchema = applySortedMongooseAdditionalFunctions(
    SchemaFactory.createForClass(ShareRealisationSchema),
);
