import { Model } from 'mongoose';
import { BaseSchema } from '../../base.schema';
import { Document, Schema as MongooseSchema } from 'mongoose';
export declare const CRENEAU_MODEL_NAME = "creneaux";
declare class CreneauSchema extends BaseSchema {
    startTimeAvailable: string;
    endTimeAvailable: string;
    agenda_id: string;
}
export type Creneau = CreneauSchema & Document;
export type CreneauModel = Model<CreneauSchema>;
export declare const CreneauxSchema: MongooseSchema<any, Model<any, any, any, any, any, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, {
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
