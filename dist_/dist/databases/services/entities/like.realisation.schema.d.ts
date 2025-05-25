import { Model } from 'mongoose';
import { BaseSchema } from '../../base.schema';
import { Document, Schema as MongooseSchema } from 'mongoose';
export declare const LIKE_REALISATION_MODEL_NAME = "like_realisation";
declare class LikeRealisationSchema extends BaseSchema {
    user_id: string;
    realisation_id: string;
}
export type LikeRealisation = LikeRealisationSchema & Document;
export type LikeRealisationModel = Model<LikeRealisationSchema>;
export declare const LikeRealisationsSchema: MongooseSchema<any, Model<any, any, any, any, any, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, {
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
