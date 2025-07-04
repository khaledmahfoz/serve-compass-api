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
  constructor(reflector: Reflector) {
    super(reflector);
  }

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    return next.handle().pipe(
      map((data: PlainLiteralObject | Array<PlainLiteralObject>) => {
        const role = request.session?.passport?.user?.role;
        const groups = role ? [role] : [];
        return this.serialize(data, { groups });
      }),
    );
  }
}
