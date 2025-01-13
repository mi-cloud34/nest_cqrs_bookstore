import { CreateBookDto } from "../../dtos/create_book.dto";

export class CreateBookCommand {
  constructor(public readonly book: CreateBookDto) {}
}