import { Injectable } from '@nestjs/common';
import { Book } from './interfaces/book.interface';

@Injectable()
export class BooksService {
  private readonly books: Book[] = [];

  createBook(newBook: Book): void {
    this.books.push(newBook);
  }

  getBooks(): Book[] {
    return this.books;
  }

  updateBooks(newBook: Book, idx: number): Book {
    this.books.splice(idx, 1, newBook);
    return this.books[idx];
  }

  deleteBook(idx: number): void {
    this.books.splice(idx, 1);
  }
}
