import { IsString, IsInt, IsNotEmpty, Min, MaxLength, IsNumber } from 'class-validator';

export class CreateBookDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  name: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  actor: string;

  @IsInt()
  @Min(0)
  stock: number;

  @IsNumber()
  @Min(0)
  price: number;
}