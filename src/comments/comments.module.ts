import { Module } from '@nestjs/common';
import { CommentService } from './comments.service';
import { CommentSchema, Comment } from './comments.schema';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Comment.name, schema: CommentSchema }]),
  ],
  providers: [CommentService],
  exports: [CommentService],
})
export class CommentModule {}
