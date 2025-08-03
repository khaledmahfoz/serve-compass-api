import { ErrorDocs } from '@lib/docs/error';
import { applyDecorators } from '@nestjs/common';
import {
  ApiOperation,
  ApiNoContentResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';

export function DeleteUserDocs(): MethodDecorator {
  return applyDecorators(
    ApiOperation({
      description: 'Delete a user by Id.',
      summary: '/users/:id',
    }),
    ApiBearerAuth(),
    ApiNoContentResponse(),
    ErrorDocs(),
  );
}
