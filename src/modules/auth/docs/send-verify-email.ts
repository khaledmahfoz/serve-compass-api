import { ErrorDocs } from '@lib/docs/error';
import { applyDecorators } from '@nestjs/common';
import { ApiNoContentResponse, ApiOperation } from '@nestjs/swagger';

export function SendVerifyEmailDocs(): MethodDecorator {
  return applyDecorators(
    ApiOperation({
      description: 'Send verify email',
      summary: '/auth/send-verify-email',
    }),
    ApiNoContentResponse(),
    ErrorDocs(),
  );
}
