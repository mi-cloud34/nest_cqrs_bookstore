import { IsInt, IsNotEmpty, Min } from 'class-validator';

export class BookIdDto {
  @IsInt()
  @IsNotEmpty()
  @Min(1) 
  id: number;
}
