import { RolesManagementService } from '@modules/roles-management/roles-management.service';
import { CallHandler, ExecutionContext, Injectable } from '@nestjs/common';
import {
  ClassSerializerInterceptor,
  PlainLiteralObject,
} from '@nestjs/common/serializer';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class RolesInterceptor extends ClassSerializerInterceptor {
  constructor(
    reflector: Reflector,
    private readonly rolesManagementService: RolesManagementService,
  ) {
    super(reflector);
  }

  intercept(context: ExecutionContext, next: CallHandler): Observable<object> {
    const request = context.switchToHttp().getRequest();
    return next.handle().pipe(
      map(async (data: PlainLiteralObject | Array<PlainLiteralObject>) => {
        const role = await this.rolesManagementService.getUserRole(
          request.user?.id,
        );
        const groups = role ? [role as string] : [];
        return this.serialize(data, { groups });
      }),
    );
  }
}
