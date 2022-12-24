import {
  Controller,
  Post,
  Get,
  Put,
  Delete,
  Body,
  Param,
} from '@nestjs/common';
import { BooksService } from './books.service';
import { IBook } from './interfaces/book.interface';
import { BookDocument } from './schemas/book.schema';

@Controller('books')
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @Post()
  createBook(@Body() data: IBook): Promise<BookDocument> {
    return this.booksService.createBook(data);
  }

  @Get()
  getBooks(): Promise<BookDocument[]> {
    return this.booksService.getBooks();
  }

  @Put(':id')
  updateBooks(@Body() data: IBook, @Param() { id }): Promise<BookDocument> {
    return this.booksService.updateBooks(data, id);
  }

  @Delete(':id')
  deleteBook(@Param() { id }): Promise<BookDocument> {
    return this.booksService.deleteBook(id);
  }
}
