import { IQueryHandler, QueryHandler } from "@nestjs/cqrs"

import { BookStore } from "src/book_store/entity/book_store.entity"
import { GetBookStoresQuery } from "./get_book_store.query"
import { AbstractBookStoreRepository } from "src/book_store/domain/repositories/book_store.repositories"

@QueryHandler(GetBookStoresQuery)
export class GetBookStoresQueryHandler implements IQueryHandler<GetBookStoresQuery> {
  constructor(
    private readonly bookStoreRepository: AbstractBookStoreRepository<BookStore>
  ) {}

  // eslint-disable-next-line
  async execute({query}: GetBookStoresQuery) {
    const bookStores = await this.bookStoreRepository.find(query)
    return { bookStores }
  }
}

