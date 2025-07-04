import { ErrorDocs } from '@lib/docs/error';
import { applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiOkResponse } from '@nestjs/swagger';

import { AssignableRolesDto } from '../dtos/assignable-roles';

export function GetAssignableRolesDocs(): MethodDecorator {
  return applyDecorators(
    ApiOperation({
      description: 'Retrieve all assignable roles.',
      summary: '/roles',
    }),
    ApiOkResponse({
      type: AssignableRolesDto,
    }),
    ErrorDocs(),
  );
}
