import { GetBookStoresQueryHandler } from "./get_book_stores/get_book_store.handler";
import { GetBookStoreByIdQueryHandler } from "./get_book_store_by_id/get_book_store_by_id.handler";

export const BookStoreQueryHandlers = [
  GetBookStoresQueryHandler,
  GetBookStoreByIdQueryHandler
]