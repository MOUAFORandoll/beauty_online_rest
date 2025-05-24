import { Model } from 'mongoose';
import { BaseSchema } from '../../base.schema';
import { Document, Schema as MongooseSchema } from 'mongoose';
export declare enum StatusRendezVous {
    ATTENTE = "EN ATTENTE",
    ACCEPTER = "ACCEPTE",
    REFUSER = "REFUSE"
}
export declare const RENDEZ_VOUS_MODEL_NAME = "rendez_vous";
declare class RendezVousSchema extends BaseSchema {
    status: string;
    user_id: string;
    realisation_id: string;
    creneau_id: string;
}
export type RendezVous = RendezVousSchema & Document;
export type RendezVousModel = Model<RendezVousSchema>;
export declare const RendezVoussSchema: MongooseSchema<any, Model<any, any, any, any, any, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, {
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
