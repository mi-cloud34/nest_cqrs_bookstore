import { IQueryHandler, QueryHandler } from "@nestjs/cqrs"
import { Book } from "src/book/entity/book.entity"
import { GetBooksQuery } from "./get_book.query"
import { AbstractBookRepository } from "src/book/domain/repositories/book.repositories"

@QueryHandler(GetBooksQuery)
export class GetBooksQueryHandler implements IQueryHandler<GetBooksQuery> {
  constructor(
    private readonly bookRepository: AbstractBookRepository<Book>
  ) {}

  // eslint-disable-next-line
  async execute({query}: GetBooksQuery) {
    const books = await this.bookRepository.find(query)
    return { books }
  }
}

