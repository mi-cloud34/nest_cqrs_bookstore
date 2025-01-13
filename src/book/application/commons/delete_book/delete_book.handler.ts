import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { DeleteBookByIdCommand } from "./delete_book.command";

import { AbstractBookRepository } from "src/book/domain/repositories/book.repositories";
import { Book } from "src/book/entity/book.entity";

@CommandHandler(DeleteBookByIdCommand)
export class DeleteBookByIdCommandHandler
  implements ICommandHandler<DeleteBookByIdCommand>
{
  constructor(
    private readonly bookRepository: AbstractBookRepository<Book>
  ) {}

  async execute({ bookId }: DeleteBookByIdCommand) {
    await this.bookRepository.findByIdAndDelete(bookId)
  }
}