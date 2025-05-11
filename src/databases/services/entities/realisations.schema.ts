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

    @Prop({ type: MongooseSchema.Types.ObjectId, ref: PROFILE_PRO_MODEL_NAME })
    profile_professionnel_id: string;
}
export type Realisation = RealisationSchema & Document;
export type RealisationModel = Model<RealisationSchema>;
export const RealisationsSchema = applySortedMongooseAdditionalFunctions(
    SchemaFactory.createForClass(RealisationSchema),
);

// REALISATION_FILE
export const REALISATION_FILE_MODEL_NAME = 'realisation_files';
@Schema({ collection: REALISATION_FILE_MODEL_NAME })
class RealisationFileSchema extends BaseSchema {
    @Prop({ type: MongooseSchema.Types.ObjectId, ref: REALISATION_MODEL_NAME })
    realisation_id: string;

    @Prop()
    file_path: string;
}
export type RealisationFile = RealisationFileSchema & Document;
export type RealisationFileModel = Model<RealisationFileSchema>;
export const RealisationFilesSchema = applySortedMongooseAdditionalFunctions(
    SchemaFactory.createForClass(RealisationFileSchema),
);
