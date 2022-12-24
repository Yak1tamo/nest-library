import { Injectable } from '@nestjs/common';
import { Model, Connection } from 'mongoose';
import { InjectModel, InjectConnection } from '@nestjs/mongoose';
import { Book, BookDocument } from './schemas/book.schema';
import { IBook } from './interfaces/book.interface';

@Injectable()
export class BooksService {
  constructor(
    @InjectModel(Book.name) private BookModel: Model<BookDocument>,
    @InjectConnection() private connection: Connection,
  ) {}

  async createBook(data: IBook): Promise<BookDocument> {
    const newbook = new this.BookModel(data);
    return await newbook.save();
  }

  async getBooks(): Promise<BookDocument[]> {
    return await this.BookModel.find().exec();
  }

  async updateBooks(data: IBook, id: string): Promise<BookDocument> {
    return await this.BookModel.findOneAndUpdate({ _id: id }, data);
  }

  async deleteBook(id: string): Promise<BookDocument> {
    return await this.BookModel.findOneAndRemove({ _id: id });
  }
}
