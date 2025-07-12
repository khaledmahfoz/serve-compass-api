import { ErrorDocs } from '@lib/docs/error';
import { applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiNoContentResponse } from '@nestjs/swagger';

export function UpdateUserRoleDocs(): MethodDecorator {
  return applyDecorators(
    ApiOperation({
      description: 'Update user role.',
      summary: '/roles-management/users/:id/role',
    }),
    ApiNoContentResponse(),
    ErrorDocs(),
  );
}
