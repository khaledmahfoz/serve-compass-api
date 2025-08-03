import { IUser } from '@interfaces/users/user';
import { ExecutionContext, Injectable } from '@nestjs/common';
import { Request } from 'express';

import { AuthenticationGuard } from './authentication';

@Injectable()
export class AuthorizationGuard extends AuthenticationGuard {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const parentCanActivate = await super.canActivate(context);
    if (!parentCanActivate) return false;

    const request = context.switchToHttp().getRequest<Request>();
    const params = request.params;
    return params.id === (request.user as IUser).id;
  }
}
