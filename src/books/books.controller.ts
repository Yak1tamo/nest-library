import {
  Controller,
  Post,
  Get,
  Put,
  Delete,
  Body,
  Param,
  UseInterceptors,
  UsePipes,
} from '@nestjs/common';
import { BooksService } from './books.service';
import { IBook } from './interfaces/book.interface';
import { BookDocument } from './schemas/book.schema';
import { ResponseInterceptor } from '../app.response.interceptor';
import { JoiValidationPipe } from './validation/joi.validation.pipe';
import { idSchema } from './validation/schemas/idParam.schema';

@UseInterceptors(ResponseInterceptor)
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

  // @UsePipes(new JoiValidationPipe(idSchema))
  @Put(':id')
  updateBooks(
    @Body() data: IBook,
    @Param(new JoiValidationPipe(idSchema)) id: string,
  ): Promise<BookDocument> {
    return this.booksService.updateBooks(data, id);
  }

  @Delete(':id')
  deleteBook(
    @Param(new JoiValidationPipe(idSchema)) id: string,
  ): Promise<BookDocument> {
    return this.booksService.deleteBook(id);
  }
}
