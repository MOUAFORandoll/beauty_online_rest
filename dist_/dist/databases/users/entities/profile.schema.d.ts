import { BaseSchema } from '../../base.schema';
import { Document, Model, Schema as MongooseSchema } from 'mongoose';
export declare enum ServiceType {
    COIFFURE = "COIFFURE",
    MANICURE = "MANICURE"
}
export declare const PROFILE_PRO_MODEL_NAME = "profiles_professionnels";
declare class ProfileProfessionnelSchema extends BaseSchema {
    namePro: string;
    description: string;
    user_id: string;
    service: string;
    cover?: string;
}
export type ProfileProfessionnel = ProfileProfessionnelSchema & Document;
export type ProfileProfessionnelModel = Model<ProfileProfessionnelSchema>;
export declare const ProfileProfessionnelsSchema: MongooseSchema<any, Model<any, any, any, any, any, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, {
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
