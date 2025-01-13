import { CommandHandler, ICommandHandler } from "@nestjs/cqrs"
import { CreateBookCommand } from "./create_book.command"
import { Book } from "src/book/entity/book.entity"
import { AbstractBookRepository } from "src/book/domain/repositories/book.repositories"

@CommandHandler(CreateBookCommand)
export class CreateBookCommandHandler
  implements ICommandHandler<CreateBookCommand>
{
  constructor(
    private readonly bookRepository: AbstractBookRepository<Book>
  ) {}

  async execute({ book }: CreateBookCommand) {
    const createdBook = await this.bookRepository.create(book)
    return { book: createdBook }
  }
}