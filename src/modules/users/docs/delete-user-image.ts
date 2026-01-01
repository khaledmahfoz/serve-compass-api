import { ErrorDocs } from '@lib/docs/error';
import { applyDecorators } from '@nestjs/common';
import { ApiNoContentResponse, ApiOperation, ApiParam } from '@nestjs/swagger';

export function DeleteUserImageDocs(): MethodDecorator {
  return applyDecorators(
    ApiOperation({
      description: 'Delete the image for a user by Id.',
      summary: '/users/:id/image',
    }),
    ApiParam({
      name: 'id',
      required: true,
      type: String,
      description: 'User Id',
      example: '98741050-596d-4f7c-b419-44675285c4f2',
    }),
    ApiNoContentResponse(),
    ErrorDocs(),
  );
}
