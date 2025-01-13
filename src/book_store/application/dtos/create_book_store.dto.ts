import { IsString, IsNotEmpty, IsArray, ArrayNotEmpty, MaxLength } from 'class-validator';
import { Book } from 'src/book/entity/book.entity';
import { DeepPartial } from 'typeorm';

export class CreateBookStoreDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  name: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  address: string;

  @IsArray()
  @ArrayNotEmpty()
  @IsArray()
  
  books: number[];
  //books: DeepPartial<Book[]>;
}
