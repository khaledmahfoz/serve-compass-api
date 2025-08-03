import { ErrorDocs } from '@lib/docs/error';
import { applyDecorators } from '@nestjs/common';
import { ApiNoContentResponse, ApiOperation } from '@nestjs/swagger';

export function ResetPasswordDocs(): MethodDecorator {
  return applyDecorators(
    ApiOperation({
      description: 'Reset password',
      summary: '/auth/reset-password/:token',
    }),
    ApiNoContentResponse(),
    ErrorDocs(),
  );
}
