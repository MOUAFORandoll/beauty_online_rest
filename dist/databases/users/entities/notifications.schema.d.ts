import { Document, Schema as MongooseSchema, Model } from 'mongoose';
import { BaseSchema } from '../../base.schema';
export declare enum NotificationType {
    WELCOME = "welcome",
    GENERAL = "generale",
    INFORMATION = "information",
    NEW_RDV = "new_rdv",
    RDV_ACCEPTED = "rdv_accepted",
    RDV_REFUSED = "rdv_refused",
    NEW_FEATURE = "new_feature",
    BEST_CONSULTANTS = "best_consultants"
}
export declare const NOTIFICATION_MODEL_NAME = "notifications";
export declare class NotificationSchema extends BaseSchema {
    type: NotificationType;
    message: string;
    user_id: string;
    ref_id: string;
}
export type Notification = NotificationSchema & Document;
export type NotificationModel = Model<NotificationSchema>;
export declare const NotificationsSchema: MongooseSchema<any, Model<any, any, any, any, any, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, {
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
