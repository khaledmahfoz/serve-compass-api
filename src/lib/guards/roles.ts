import { ISerializedUser } from '@interfaces/users/serialized-user';
import { RolesManagementService } from '@modules/roles-management/roles-management.service';
import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Request } from 'express';

import { AuthenticationGuard } from './authentication';

@Injectable()
export class RolesGuard extends AuthenticationGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly rolesManagementService: RolesManagementService,
  ) {
    super();
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const parentCanActivate = await super.canActivate(context);
    if (!parentCanActivate) return false;
    const roles = this.reflector.getAllAndOverride<string[]>('roles', [
      context.getHandler(),
      context.getClass(),
    ]);
    if (!roles) return true;

    const request = context.switchToHttp().getRequest<Request>();
    const sessionUser = request.user as ISerializedUser;

    const userRole = await this.rolesManagementService.getUserRole(
      sessionUser?.id,
    );

    const hasRole = roles.some((role) => userRole === role);
    if (!hasRole) throw new ForbiddenException();

    return true;
  }
}
