import { CreateBookStoreDto } from "../../dtos/create_book_store.dto";

export class CreateBookStoreCommand {
  constructor(public readonly bookStore: CreateBookStoreDto) {}
}