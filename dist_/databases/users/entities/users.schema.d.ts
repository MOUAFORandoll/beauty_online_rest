import { Model } from 'mongoose';
import { BaseSchema } from '../../base.schema';
import { Document } from 'mongoose';
export declare enum UserType {
    DEFAULT = "CLIENT",
    PROFESSIONNEL = "PROFESSIONNEL",
    ADMIN = "ADMIN"
}
export declare const USER_MODEL_NAME = "users";
declare class UserSchema extends BaseSchema {
    userName: string;
    email: string;
    phone: string;
    countryCode: string;
    codePhone: string;
    typeUser: string;
    pictureUrl: string;
    firebaseUID: string;
    firebaseNotificationToken: string;
    authProvider: string;
}
export type User = UserSchema & Document;
export type UserModel = Model<UserSchema>;
export declare const UsersSchema: import("mongoose").Schema<any, Model<any, any, any, any, any, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, {
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
