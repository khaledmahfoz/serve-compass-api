import { ErrorDocs } from '@lib/docs/error';
import { applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiOkResponse } from '@nestjs/swagger';

export function GetUsersRolesDocs(): MethodDecorator {
  return applyDecorators(
    ApiOperation({
      description: 'Get all users roles.',
      summary: '/roles-management/users',
    }),
    ApiOkResponse(),
    ErrorDocs(),
  );
}
