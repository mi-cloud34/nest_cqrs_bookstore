import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { AbstractBookStoreRepository } from "src/book_store/domain/repositories/book_store.repositories";

import { BaseRepository } from "src/common/insfractructure/repository/base.repository";
import { BookStore } from "src/book_store/entity/book_store.entity";

@Injectable()
export class BookStoreRepository
  extends BaseRepository<BookStore>
  implements AbstractBookStoreRepository<BookStore>
{
  constructor(
    @InjectRepository(BookStore) private bookStoreModel: Repository<BookStore>
  ) {
    super(bookStoreModel);
  }
}