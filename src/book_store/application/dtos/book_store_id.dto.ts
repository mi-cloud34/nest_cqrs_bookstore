import { IsInt, IsNotEmpty, Min } from 'class-validator';

export class BookStoreIdDto {
  @IsInt()
  @IsNotEmpty()
  @Min(1) // ID değeri 1 veya daha büyük olmalıdır
  id: number;
}
