import { IQueryHandler, QueryHandler } from "@nestjs/cqrs"
import { Book } from "src/book/entity/book.entity"
import { GetBooksQueryIds } from "./get_book_ids.query"
import { AbstractBookRepository } from "src/book/domain/repositories/book.repositories"

@QueryHandler(GetBooksQueryIds)
export class GetBooksQueryIdsHandler implements IQueryHandler<GetBooksQueryIds> {
  constructor(
    private readonly bookRepository: AbstractBookRepository<Book>
  ) {}

  // eslint-disable-next-line
  async execute({books}: GetBooksQueryIds) {
    const bookList = await this.bookRepository.findByIds(books)
    return { bookList }
  }
}

