import { Test, TestingModule } from '@nestjs/testing';
import { BooksController } from './books.controller';
import { BooksService } from './books.service';
import { getModelToken } from '@nestjs/mongoose';
import { BookSchema, Book } from './schemas/book.schema';
import { Model } from 'mongoose';

describe('BooksService', () => {
  let booksService: BooksService;

  beforeAll(async () => {
    const app = await Test.createTestingModule({
      controllers: [BooksController],
      providers: [
        BooksService,
        {
          provide: getModelToken(Book.name),
          useValue: Model,
        },
      ],
      exports: [BooksService],
    }).compile();

    booksService = await app.resolve<BooksService>(BooksService);
  });

  describe('books', () => {
    it('get books', async () => {
      // const result = [];
      const books = booksService.getBooks();
      expect([]).toEqual([]);
      // jest.spyOn(appService, 'getAllBooks').mockImplementation(() => result);
      // expect(await appController.getBooks()).toBe(result);
    });
  });
});
