import { SetMetadata } from '@nestjs/common';
import { Rolles } from 'src/auth/enums/role.enum';

export const Roles = (...roles: [Rolles,...Rolles[]]) => SetMetadata('roles', roles);