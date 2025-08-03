import { ErrorDocs } from '@lib/docs/error';
import { applyDecorators } from '@nestjs/common';
import { ApiNoContentResponse, ApiOperation } from '@nestjs/swagger';

export function VerifyEmailDocs(): MethodDecorator {
  return applyDecorators(
    ApiOperation({
      description: 'Verify email',
      summary: '/auth/verify-email/:token',
    }),
    ApiNoContentResponse(),
    ErrorDocs(),
  );
}
