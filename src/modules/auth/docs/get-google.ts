import { ErrorDocs } from '@lib/docs/error';
import { applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiTemporaryRedirectResponse } from '@nestjs/swagger';

export function GetGoogleDocs(): MethodDecorator {
  return applyDecorators(
    ApiOperation({
      description: 'Initiate google login',
      summary: '/auth/google',
    }),
    ApiTemporaryRedirectResponse(),
    ErrorDocs(),
  );
}
