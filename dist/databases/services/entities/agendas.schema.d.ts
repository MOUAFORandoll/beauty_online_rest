import { Model } from 'mongoose';
import { BaseSchema } from '../../base.schema';
import { Document, Schema as MongooseSchema } from 'mongoose';
export declare const AGENDA_MODEL_NAME = "agendas";
declare class AgendaSchema extends BaseSchema {
    day: Date;
    profile_professionnel_id: string;
}
export type Agenda = AgendaSchema & Document;
export type AgendaModel = Model<AgendaSchema>;
export declare const AgendasSchema: MongooseSchema<any, Model<any, any, any, any, any, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, {
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
