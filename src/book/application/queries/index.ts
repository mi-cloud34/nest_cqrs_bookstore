import { GetBooksQueryHandler } from "./get_books/get_book.handler";
import { GetBookByIdQueryHandler } from "./get_book_by_id/get_book_by_id.handler";
import { GetBooksQueryIdsHandler } from "./get_books_ids/get_book_ids.handler";

export const BookQueryHandlers = [
  GetBooksQueryHandler,
  GetBookByIdQueryHandler,
  GetBooksQueryIdsHandler
]