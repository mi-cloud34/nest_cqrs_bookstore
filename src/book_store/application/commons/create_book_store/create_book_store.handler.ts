import { CommandHandler, ICommandHandler } from "@nestjs/cqrs"
import { CreateBookStoreCommand } from "./create_book_store.command"
import { AbstractBookStoreRepository } from "src/book_store/domain/repositories/book_store.repositories"
import { BookStore } from "src/book_store/entity/book_store.entity"

@CommandHandler(CreateBookStoreCommand)
export class CreateBookStoreCommandHandler
  implements ICommandHandler<CreateBookStoreCommand>
{
  constructor(
    private readonly bookStoreRepository: AbstractBookStoreRepository<BookStore>
  ) {}

  async execute({ bookStore }: CreateBookStoreCommand) {
    const createdBookStore = await this.bookStoreRepository.create(bookStore)
    return { bookStore: createdBookStore }
  }
}