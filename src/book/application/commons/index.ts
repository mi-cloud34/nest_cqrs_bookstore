import { CreateBookCommandHandler } from "./create_book/create_book.handler";
import { DeleteBookByIdCommandHandler } from "./delete_book/delete_book.handler";
import { UpdateBookByIdCommandHandler } from "./update_book/update_book.handler";

export const BookCommandHandlers = [
  CreateBookCommandHandler,
  UpdateBookByIdCommandHandler,
  DeleteBookByIdCommandHandler
]