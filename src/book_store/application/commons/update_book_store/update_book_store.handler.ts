import { CommandHandler, ICommandHandler } from "@nestjs/cqrs"
import { UpdateBookStoreByIdCommand } from "./update_book_store.command"
import { AbstractBookStoreRepository } from "src/book_store/domain/repositories/book_store.repositories"
import { BookStore } from "src/book_store/entity/book_store.entity"


@CommandHandler(UpdateBookStoreByIdCommand)
export class UpdateBookStoreByIdCommandHandler
  implements ICommandHandler<UpdateBookStoreByIdCommand>
{
  constructor(
    private readonly bookStoreRepository: AbstractBookStoreRepository<BookStore>
  ) {}

  async execute({ bookStoreId ,bookStore }: UpdateBookStoreByIdCommand) {
    const updatedBookStore = await this.bookStoreRepository.findByIdAndUpdate(
      bookStoreId,
      bookStore
    )
    return { BookStore: updatedBookStore }
  }
}