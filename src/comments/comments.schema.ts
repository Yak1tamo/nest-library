import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type CommentDocument = Comment & Document;

@Schema()
export class Comment {
  @Prop({ required: true })
  public bookId: number;

  @Prop({ required: true })
  public comment: string;
}

export const CommentSchema = SchemaFactory.createForClass(Comment);
