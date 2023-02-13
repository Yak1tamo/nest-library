import { Injectable } from '@nestjs/common';
import { Model, Connection } from 'mongoose';
import { InjectModel, InjectConnection } from '@nestjs/mongoose';
import { Comment, CommentDocument } from './comments.schema';
import { BookCommentDto } from './dto/book-comment';

@Injectable()
export class CommentService {
  constructor(
    @InjectModel(Comment.name) private CommentModel: Model<CommentDocument>,
    @InjectConnection() private connection: Connection,
  ) {}

  async create(data: BookCommentDto): Promise<CommentDocument> {
    const newComment = new this.CommentModel(data);
    return await newComment.save();
  }

  async get(): Promise<CommentDocument[]> {
    return await this.CommentModel.find().exec();
  }

  async update(data: BookCommentDto, id: string): Promise<CommentDocument> {
    return await this.CommentModel.findOneAndUpdate({ _id: id }, data);
  }

  async delete(id: string): Promise<CommentDocument> {
    return await this.CommentModel.findOneAndRemove({ _id: id });
  }

  async findAllBookComment(bookId: string) {
    return await this.CommentModel.find({ bookId });
  }
}
