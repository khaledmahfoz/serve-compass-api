import { ErrorDocs } from '@lib/docs/error';
import { applyDecorators } from '@nestjs/common';
import { ApiNoContentResponse, ApiOperation } from '@nestjs/swagger';

export function RegisterDocs(): MethodDecorator {
  return applyDecorators(
    ApiOperation({
      description: 'Register a new user',
      summary: '/auth/register',
    }),
    ApiNoContentResponse(),
    ErrorDocs(),
  );
}
