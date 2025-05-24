import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BaseSchema } from '../../base.schema';
import { Document, Schema as MongooseSchema } from 'mongoose';

import { applySortedMongooseAdditionalFunctions } from '../../base.functions'; 
import { USER_MODEL_NAME } from 'src/databases/users/entities';
import { REALISATION_MODEL_NAME } from './realisations.schema';

// VUE
export const VUE_MODEL_NAME = 'vue';
@Schema({ collection: VUE_MODEL_NAME })
class VueSchema extends BaseSchema {
    @Prop({ type: MongooseSchema.Types.ObjectId, ref: USER_MODEL_NAME })
    user_id: string;
    @Prop({ type: MongooseSchema.Types.ObjectId, ref: REALISATION_MODEL_NAME })
    realisation_id: string;
}
export type Vue = VueSchema & Document;
export type VueModel = Model<VueSchema>;
export const VuesSchema = applySortedMongooseAdditionalFunctions(
    SchemaFactory.createForClass(VueSchema),
);
