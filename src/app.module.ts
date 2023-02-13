import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { BooksModule } from './books/books.module';
import { AuthModule } from './auth/auth.module';
import { CommentModule } from './comments/comments.module';
import { AppGateway } from './app.gateway';
@Module({
  imports: [
    MongooseModule.forRoot(process.env.MONGO_CONNECTION),
    BooksModule,
    AuthModule,
    CommentModule,
  ],
  controllers: [AppController],
  providers: [AppService, AppGateway],
})
export class AppModule {}
