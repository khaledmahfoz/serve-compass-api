import { ErrorDocs } from '@lib/docs/error';
import { applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiOkResponse } from '@nestjs/swagger';

import { UserDto } from '../dtos/user';

export function GetUserDocs(): MethodDecorator {
  return applyDecorators(
    ApiOperation({
      description: 'Retrieve a user by Id.',
      summary: '/users',
    }),
    ApiOkResponse({
      type: UserDto,
    }),
    ErrorDocs(),
  );
}
