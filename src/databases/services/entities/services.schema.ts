import { ApiProperty } from '@nestjs/swagger';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BaseSchema } from '../../base.schema';
import { Document, Schema as MongooseSchema } from 'mongoose';

import { applySortedMongooseAdditionalFunctions } from '../../base.functions';
import { PROFIL_PRO_MODEL_NAME, USER_MODEL_NAME } from 'src/databases/users/entities';

// SERVICES
export const SERVICES_MODEL_NAME = 'services';
@Schema({ collection: SERVICES_MODEL_NAME })
class ServiceSchema extends BaseSchema {
    @Prop()
    label: string;
}
export type ServicesDocument = ServiceSchema & Document;
export type ServicesModel = Model<ServiceSchema>;
export const ServicesSchema = applySortedMongooseAdditionalFunctions(
    SchemaFactory.createForClass(ServiceSchema),
);
 