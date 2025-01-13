import { IsEmail, isEnum, IsEnum, IsNumber, IsString, Matches, MinLength } from 'class-validator';
import { Role } from 'src/roles/entity/role.entity';
import { Rolles } from '../enums/role.enum';

export class SignupDto {
  @IsString()
  name: string;

  @IsEmail()
  email: string;

  @IsString()
  @MinLength(6)
  @Matches(/^(?=.*[0-9])/, { message: 'Password must contain at least one number' })
  password: string;
  @IsEnum(Rolles, { message: 'Role must be a valid enum value' })
  role: Rolles;
}
