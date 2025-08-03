import { ErrorDocs } from '@lib/docs/error';
import { applyDecorators } from '@nestjs/common';
import { ApiNoContentResponse, ApiOperation } from '@nestjs/swagger';

export function SendResetPasswordEmailDocs(): MethodDecorator {
  return applyDecorators(
    ApiOperation({
      description: 'Send reset password email',
      summary: '/auth/send-reset-password-email',
    }),
    ApiNoContentResponse(),
    ErrorDocs(),
  );
}
