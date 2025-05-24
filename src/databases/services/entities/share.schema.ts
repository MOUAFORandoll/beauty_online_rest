import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BaseSchema } from '../../base.schema';
import { Document, Schema as MongooseSchema } from 'mongoose';

import { applySortedMongooseAdditionalFunctions } from '../../base.functions'; 
import { USER_MODEL_NAME } from 'src/databases/users/entities';
import { REALISATION_MODEL_NAME } from './realisations.schema';

// SHARE
export const SHARE_MODEL_NAME = 'partages';
@Schema({ collection: SHARE_MODEL_NAME })
class ShareSchema extends BaseSchema {
    @Prop({ type: MongooseSchema.Types.ObjectId, ref: USER_MODEL_NAME })
    user_id: string;
    @Prop({ type: MongooseSchema.Types.ObjectId, ref: REALISATION_MODEL_NAME })
    realisation_id: string;
}
export type Share = ShareSchema & Document;
export type ShareModel = Model<ShareSchema>;
export const SharesSchema = applySortedMongooseAdditionalFunctions(
    SchemaFactory.createForClass(ShareSchema),
);
