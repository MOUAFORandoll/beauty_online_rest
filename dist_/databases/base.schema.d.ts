import { Document } from 'mongoose';
export declare class BaseSchema {
    created_at: number;
    updated_at: number;
    deleted_at: Date;
    setDeleted(): void;
}
export type BaseDocument = BaseSchema & Document;
export declare const BaseEntitySchema: import("mongoose").Schema<BaseSchema, import("mongoose").Model<BaseSchema, any, any, any, Document<unknown, any, BaseSchema> & BaseSchema & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, BaseSchema, Document<unknown, {}, import("mongoose").FlatRecord<BaseSchema>> & import("mongoose").FlatRecord<BaseSchema> & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}>;
