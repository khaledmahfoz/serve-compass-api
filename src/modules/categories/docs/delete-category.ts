import { ErrorDocs } from '@lib/docs/error';
import { applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiParam, ApiNoContentResponse } from '@nestjs/swagger';

export function DeleteCategoryDocs(): MethodDecorator {
  return applyDecorators(
    ApiOperation({
      description: 'Delete a category by Id.',
    }),
    ApiParam({
      name: 'id',
      required: true,
      type: String,
      description: 'Category ID',
    }),
    ApiNoContentResponse(),
    ErrorDocs(),
  );
}
