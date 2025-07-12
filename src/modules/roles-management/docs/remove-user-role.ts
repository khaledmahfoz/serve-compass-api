import { ErrorDocs } from '@lib/docs/error';
import { applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiNoContentResponse } from '@nestjs/swagger';

export function RemoveUserRoleDocs(): MethodDecorator {
  return applyDecorators(
    ApiOperation({
      description: 'Remove user role.',
      summary: '/roles-management/users/:id/role',
    }),
    ApiNoContentResponse(),
    ErrorDocs(),
  );
}
