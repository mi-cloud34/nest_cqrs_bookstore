import { Module } from '@nestjs/common';
import { BookStoreController } from './book_store.controller';
import { BookStore } from './entity/book_store.entity';
import { BookStoreQueryHandlers } from './application/queries';
import { BookStoreRepository } from './insfrastructure/repositories/book_store.repository';
import { CqrsModule } from '@nestjs/cqrs';
import { AbstractBookStoreRepository } from './domain/repositories/book_store.repositories';
import { IsBookStoreExist } from './application/dtos/custom_validator/is_categories_exits.validator';
import { AuthService } from 'src/auth/auth.service';
import { AuthModule } from 'src/auth/auth.module';
import { BookStoreCommandHandlers } from './application/commons';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BookCommandHandlers } from 'src/book/application/commons';
import { BookQueryHandlers } from 'src/book/application/queries';
import { BookModule } from 'src/book/book.module';

@Module({
  imports:[
    CqrsModule,
  AuthModule,BookModule,
    TypeOrmModule.forFeature([
       BookStore]),
  ],
  controllers: [BookStoreController],
  providers: [
    { provide: AbstractBookStoreRepository, useClass: BookStoreRepository },
    IsBookStoreExist,
    ...BookStoreCommandHandlers,
    ...BookStoreQueryHandlers,
   
  ],
  exports: [AbstractBookStoreRepository],
})
export class BookStoreModule {}
