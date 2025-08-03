import { ErrorDocs } from '@lib/docs/error';
import { applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiBody, ApiNoContentResponse } from '@nestjs/swagger';

import { UpdateUserDto } from '../dtos/update-user';

export function UpdateUserDocs(): MethodDecorator {
  return applyDecorators(
    ApiOperation({
      description: 'Update a user by Id.',
      summary: '/users/:id',
    }),
    ApiBody({
      type: UpdateUserDto,
    }),
    ApiNoContentResponse(),
    ErrorDocs(),
  );
}
