import { UpdateBookDto } from "../../dtos/update_book.dto";

export class UpdateBookByIdCommand {
  constructor(
    public readonly bookId: number,
    public readonly book: UpdateBookDto
  ) {}
}