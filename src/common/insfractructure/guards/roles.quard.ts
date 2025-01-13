import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Rolles } from 'src/auth/enums/role.enum';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<Rolles[]>('roles', 
       [ context.getHandler(),
        context.getClass()]
    );
    if (!requiredRoles) {
      return true;
    }

    const user= context.switchToHttp().getRequest().user;
    console.log("userRolessssssss",user);
    
    const hasRequiredRoles=requiredRoles.some((role) => user.role === role);
    console.log("userRolessssssss",user.roles);
    
    return hasRequiredRoles;
  }
}
