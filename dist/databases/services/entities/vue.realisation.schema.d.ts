import { Model } from 'mongoose';
import { BaseSchema } from '../../base.schema';
import { Document, Schema as MongooseSchema } from 'mongoose';
export declare const VUE_REALISATION_MODEL_NAME = "vue";
declare class VueRealisationSchema extends BaseSchema {
    user_id: string;
    realisation_id: string;
}
export type VueRealisation = VueRealisationSchema & Document;
export type VueRealisationModel = Model<VueRealisationSchema>;
export declare const VueRealisationsSchema: MongooseSchema<any, Model<any, any, any, any, any, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, {
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
