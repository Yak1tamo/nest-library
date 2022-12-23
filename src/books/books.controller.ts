import { Controller, Post, Get, Put, Delete, Body } from '@nestjs/common';
import { BooksService } from './books.service';
import { Book } from './interfaces/book.interface';

@Controller('books')
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @Post()
  createBook(@Body() newBook: Book): void {
    return this.booksService.createBook(newBook);
  }

  @Get()
  getBooks(): Book[] {
    return this.booksService.getBooks();
  }

  @Put()
  updateBooks(@Body() newBook: Book, idx = 0): Book {
    return this.booksService.updateBooks(newBook, idx);
  }

  @Delete()
  deleteBook(idx = 0): void {
    return this.booksService.deleteBook(idx);
  }
}
