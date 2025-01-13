import { IQueryHandler, QueryHandler } from "@nestjs/cqrs"
import { AbstractBookStoreRepository } from "src/book_store/domain/repositories/book_store.repositories"

import { BookStore } from "src/book_store/entity/book_store.entity"
import { GetBookStoreByIdQuery } from "./get_book_store_by_id.query"

@QueryHandler(GetBookStoreByIdQueryHandler)
export class GetBookStoreByIdQueryHandler
  implements IQueryHandler<GetBookStoreByIdQuery>
{
  constructor(
    private readonly bookStoreRepository: AbstractBookStoreRepository<BookStore>
  ) {}

  async execute({ bookStoreId }: GetBookStoreByIdQuery) {
    const bookStore = await this.bookStoreRepository.findById(bookStoreId)
    return { bookStore }
  }
}