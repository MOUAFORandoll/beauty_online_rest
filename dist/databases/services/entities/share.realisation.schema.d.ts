import { Model } from 'mongoose';
import { BaseSchema } from '../../base.schema';
import { Document, Schema as MongooseSchema } from 'mongoose';
export declare const SHARE_REALISATION_MODEL_NAME = "share_realisation";
declare class ShareRealisationSchema extends BaseSchema {
    user_id: string;
    realisation_id: string;
}
export type ShareRealisation = ShareRealisationSchema & Document;
export type ShareRealisationModel = Model<ShareRealisationSchema>;
export declare const ShareRealisationsSchema: MongooseSchema<any, Model<any, any, any, any, any, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, {
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
