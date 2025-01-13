import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { DeleteBookStoreByIdCommand } from "./delete_book_store.command";
import { AbstractBookStoreRepository } from "src/book_store/domain/repositories/book_store.repositories";
import { BookStore } from "src/book_store/entity/book_store.entity";

@CommandHandler(DeleteBookStoreByIdCommand)
export class DeleteBookStoreByIdCommandHandler
  implements ICommandHandler<DeleteBookStoreByIdCommand>
{
  constructor(
    private readonly bookStoreRepository: AbstractBookStoreRepository<BookStore>
  ) {}

  async execute({ bookStoreId }: DeleteBookStoreByIdCommand) {
    await this.bookStoreRepository.findByIdAndDelete(bookStoreId)
  }
}