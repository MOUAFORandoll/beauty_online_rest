import { ObjectId, Schema } from 'mongoose';
export declare const applySortedMongooseAdditionalFunctions: (schema: Schema) => Schema;
export declare const applyMongooseAdditionalFunctions: (schema: Schema) => Schema;
export declare const idEquals: (one: string | ObjectId, other: string | ObjectId) => boolean;
