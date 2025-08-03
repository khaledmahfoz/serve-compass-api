import { ErrorDocs } from '@lib/docs/error';
import { applyDecorators } from '@nestjs/common';
import { ApiNoContentResponse, ApiOperation } from '@nestjs/swagger';

export function ChangePasswordDocs(): MethodDecorator {
  return applyDecorators(
    ApiOperation({
      description: 'Change password',
      summary: '/auth/change-password',
    }),
    ApiNoContentResponse(),
    ErrorDocs(),
  );
}
