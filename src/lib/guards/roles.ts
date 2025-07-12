import { ISerializedUser } from '@interfaces/users/serialized-user';
import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
} from '@nestjs/common';
import { Request } from 'express';

import { AuthenticationGuard } from './authentication';

@Injectable()
export class RolesGuard extends AuthenticationGuard implements CanActivate {
  constructor(private readonly allowedRoles: string[]) {
    super();
  }

  canActivate(context: ExecutionContext): boolean {
    const parentCanActivate = super.canActivate(context);
    if (!parentCanActivate) return false;

    const request = context.switchToHttp().getRequest<Request>();
    const user = request.user as ISerializedUser;
    const hasRole = this.allowedRoles.some((role) => user.role === role);
    if (!hasRole) {
      throw new ForbiddenException();
    }

    return true;
  }
}

export function Roles(...roles: string[]): RolesGuard {
  return new RolesGuard(roles);
}
