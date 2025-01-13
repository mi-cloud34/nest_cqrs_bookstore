import { IQueryHandler, QueryHandler } from "@nestjs/cqrs"
import { Book } from "src/book/entity/book.entity"
import { GetBookByIdQuery } from "./get_book_by_id.query"
import { AbstractBookRepository } from "src/book/domain/repositories/book.repositories"

@QueryHandler(GetBookByIdQuery)
export class GetBookByIdQueryHandler
  implements IQueryHandler<GetBookByIdQuery>
{
  constructor(
    private readonly bookRepository: AbstractBookRepository<Book>
  ) {}

  async execute({ bookId }: GetBookByIdQuery) {
    const book = await this.bookRepository.findById(bookId)
    return { book }
  }
}