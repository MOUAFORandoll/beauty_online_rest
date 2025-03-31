import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Document } from 'mongoose';
import { NotImplementedException } from '@nestjs/common';

@Schema()
export class BaseSchema {
    @ApiProperty()
    @Prop({
        type: Number,
        default: () => Date.now(),
        index: true
    })
    created_at: number;
    @ApiProperty()
    @Prop({ type: Number })
    updated_at: number;
    @ApiProperty()
    @Prop({ type: Number })
    deleted_at: number;

    setDeleted(): Promise<void> {
        throw new NotImplementedException();
    };
}

export type BaseDocument = BaseSchema & Document;
export const BaseEntitySchema = SchemaFactory.createForClass(BaseSchema);
