import { Module } from '@nestjs/common';
import { BookController } from './book.controller';
import { Book } from './entity/book.entity';
import { BookQueryHandlers } from './application/queries';
import { BookCommandHandlers } from './application/commons';
import { BookRepository } from './insfrastructure/repositories/book.repository';
import { CqrsModule } from '@nestjs/cqrs';
import { AbstractBookRepository } from './domain/repositories/book.repositories';
import { IsBookExist } from './application/dtos/custom_validator/is_books_exits.validator';
import { AuthService } from 'src/auth/auth.service';
import { AuthModule } from 'src/auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports:[
    CqrsModule,
  AuthModule,
    TypeOrmModule.forFeature([Book]),
  ],
  controllers: [BookController],
  providers: [
    { provide: AbstractBookRepository, useClass: BookRepository },
    IsBookExist,
    ...BookCommandHandlers,
    ...BookQueryHandlers
  ],
  exports: [AbstractBookRepository],
})
export class BookModule {}
