import { ApiProperty } from '@nestjs/swagger';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema, Model } from 'mongoose';
import { BaseSchema } from '../../base.schema';
import { applySortedMongooseAdditionalFunctions } from '../../base.functions';
import { USER_MODEL_NAME } from './users.schema';

export enum NotificationType {
    WELCOME = 'welcome',
    GENERAL = 'generale',
    INFORMATION = 'information',
    NEW_RDV = 'new_rdv',
    RDV_ACCEPTED = 'rdv_accepted',
    RDV_REFUSED = 'rdv_refused',
    NEW_FEATURE = 'new_feature',
    BEST_CONSULTANTS = 'best_consultants',
}

export const NOTIFICATION_MODEL_NAME = 'notifications';

@Schema({ collection: NOTIFICATION_MODEL_NAME })
export class NotificationSchema extends BaseSchema {
    @ApiProperty({ enum: NotificationType })
    @Prop({ type: String, enum: NotificationType, required: true })
    type: NotificationType;

    @ApiProperty()
    @Prop({ required: true })
    message: string;
  
    @ApiProperty({ type: MongooseSchema.Types.ObjectId })
    @Prop({ type: MongooseSchema.Types.ObjectId, ref: USER_MODEL_NAME })
    user_id: string;
    @ApiProperty({ type: String, description: 'Référence liée à la notification (ex: ID de RDV)' })
    @Prop({ type: MongooseSchema.Types.ObjectId, required: false })
    ref_id: string;
}

export type Notification = NotificationSchema & Document;
export type NotificationModel = Model<NotificationSchema>;

export const NotificationsSchema = applySortedMongooseAdditionalFunctions(
    SchemaFactory.createForClass(NotificationSchema),
);
