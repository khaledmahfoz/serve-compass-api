import { ErrorDocs } from '@lib/docs/error';
import { applyDecorators } from '@nestjs/common';
import { ApiNoContentResponse, ApiOperation, ApiParam } from '@nestjs/swagger';

export function DeleteCategoryImageDocs(): MethodDecorator {
  return applyDecorators(
    ApiOperation({
      description: 'Delete the image for a category by Id.',
      summary: '/categories/:id/image',
    }),
    ApiParam({
      name: 'id',
      required: true,
      type: String,
      description: 'Category Id',
      example: '98741050-596d-4f7c-b419-44675285c4f2',
    }),
    ApiNoContentResponse(),
    ErrorDocs(),
  );
}
