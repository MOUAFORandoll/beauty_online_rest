import { Model } from 'mongoose';
import { BaseSchema } from '../../base.schema';
import { Document, Schema as MongooseSchema } from 'mongoose';
export declare const REALISATION_MODEL_NAME = "realisations";
declare class RealisationSchema extends BaseSchema {
    title: string;
    price: string;
    profile_professionnel_id: string;
}
export type Realisation = RealisationSchema & Document;
export type RealisationModel = Model<RealisationSchema>;
export declare const RealisationsSchema: MongooseSchema<any, Model<any, any, any, any, any, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, {
    [x: string]: unknown;
}, Document<unknown, {}, import("mongoose").FlatRecord<{
    [x: string]: unknown;
}>> & import("mongoose").FlatRecord<{
    [x: string]: unknown;
}> & Required<{
    _id: unknown;
}> & {
    __v: number;
}>;
export declare const REALISATION_FILE_MODEL_NAME = "realisation_files";
declare class RealisationFileSchema extends BaseSchema {
    realisation_id: string;
    file_path: string;
}
export type RealisationFile = RealisationFileSchema & Document;
export type RealisationFileModel = Model<RealisationFileSchema>;
export declare const RealisationFilesSchema: MongooseSchema<any, Model<any, any, any, any, any, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, {
    [x: string]: unknown;
}, Document<unknown, {}, import("mongoose").FlatRecord<{
    [x: string]: unknown;
}>> & import("mongoose").FlatRecord<{
    [x: string]: unknown;
}> & Required<{
    _id: unknown;
}> & {
    __v: number;
}>;
export {};
