import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { AbstractBookRepository } from "src/book/domain/repositories/book.repositories";
import { BaseRepository } from "src/common/insfractructure/repository/base.repository";
import { Book } from "src/book/entity/book.entity";

@Injectable()
export class BookRepository
  extends BaseRepository<Book>
  implements AbstractBookRepository<Book>
{
  constructor(
    @InjectRepository(Book) private bookRepository: Repository<Book>
  ) {
    super(bookRepository);
  }
}