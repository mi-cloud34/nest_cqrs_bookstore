import { PartialType } from '@nestjs/mapped-types';
import { CreateBookStoreDto } from './create_book_store.dto';
export class UpdateBookStoreDto extends PartialType(CreateBookStoreDto) {}