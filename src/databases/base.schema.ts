import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Document } from 'mongoose';
import { NotImplementedException } from '@nestjs/common';

@Schema()
export class BaseSchema {
    @Prop({
        type: Number,
        default: () => Date.now(),
        index: true,
    })
    created_at: number;

    @Prop({ type: Number })
    updated_at: number;

    @Prop({ type: Number })
    deleted_at: Date;

    setDeleted() {
        this.deleted_at = new Date();

        // throw new NotImplementedException();
    }
}

export type BaseDocument = BaseSchema & Document;
export const BaseEntitySchema = SchemaFactory.createForClass(BaseSchema);
