import { CommandHandler, ICommandHandler } from "@nestjs/cqrs"
import { Book } from "src/book/entity/book.entity"
import { AbstractBookRepository } from "src/book/domain/repositories/book.repositories"
import { UpdateBookByIdCommand } from "./update_book.command"


@CommandHandler(UpdateBookByIdCommand)
export class UpdateBookByIdCommandHandler
  implements ICommandHandler<UpdateBookByIdCommand>
{
  constructor(
    private readonly bookRepository: AbstractBookRepository<Book>
  ) {}

  async execute({ bookId ,book }: UpdateBookByIdCommand) {
    const updatedBook = await this.bookRepository.findByIdAndUpdate(
      bookId,
      book
    )
    return { Book: updatedBook }
  }
}