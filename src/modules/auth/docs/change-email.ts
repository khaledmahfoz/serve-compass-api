import { ErrorDocs } from '@lib/docs/error';
import { applyDecorators } from '@nestjs/common';
import { ApiNoContentResponse, ApiOperation } from '@nestjs/swagger';

export function ChangeEmailDocs(): MethodDecorator {
  return applyDecorators(
    ApiOperation({
      description: 'Change email',
      summary: '/auth/change-email',
    }),
    ApiNoContentResponse(),
    ErrorDocs(),
  );
}
