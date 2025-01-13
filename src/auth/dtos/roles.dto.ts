import { IsEnum } from "class-validator";
import { Rolles } from "../enums/role.enum";



export class RolesDto{
     @IsEnum(Rolles, { message: 'Role must be a valid enum value' })
      role: Rolles;
}