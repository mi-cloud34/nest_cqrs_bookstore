import { CreateBookStoreCommandHandler } from "./create_book_store/create_book_store.handler";
import { DeleteBookStoreByIdCommandHandler } from "./delete_book_store/delete_book_store.handler";
import { UpdateBookStoreByIdCommandHandler } from "./update_book_store/update_book_store.handler";

export const BookStoreCommandHandlers = [
  CreateBookStoreCommandHandler,
  UpdateBookStoreByIdCommandHandler,
  DeleteBookStoreByIdCommandHandler
]