import { UpdateBookStoreDto } from "../../dtos/update_book_store.dto";

export class UpdateBookStoreByIdCommand {
  constructor(
    public readonly bookStoreId: number,
    public readonly bookStore: UpdateBookStoreDto
  ) {}
}