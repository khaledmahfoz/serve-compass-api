import { ErrorDocs } from '@lib/docs/error';
import { applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiNoContentResponse } from '@nestjs/swagger';

export function AddUserRoleDocs(): MethodDecorator {
  return applyDecorators(
    ApiOperation({
      description: 'Add user role.',
      summary: '/roles-management/users',
    }),
    ApiNoContentResponse(),
    ErrorDocs(),
  );
}
