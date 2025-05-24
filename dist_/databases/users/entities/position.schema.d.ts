import { Model } from 'mongoose';
import { BaseSchema } from '../../base.schema';
import { Document, Schema as MongooseSchema } from 'mongoose';
export declare const POSITION_MODEL_NAME = "positions";
declare class PositionSchema extends BaseSchema {
    longitude: string;
    latitude: string;
    country: string;
    town: string;
    titleEmplacement: string;
    user_id: string;
    profile_professionnel_id: string;
}
export type Position = PositionSchema & Document;
export type PositionModel = Model<PositionSchema>;
export declare const PositionsSchema: MongooseSchema<any, Model<any, any, any, any, any, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, {
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
