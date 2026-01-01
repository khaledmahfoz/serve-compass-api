import { ErrorDocs } from '@lib/docs/error';
import { applyDecorators } from '@nestjs/common';
import { ApiNoContentResponse, ApiOperation, ApiParam } from '@nestjs/swagger';

export function DeleteProductImageDocs(): MethodDecorator {
  return applyDecorators(
    ApiOperation({
      description: 'Delete the image for a product by Id.',
      summary: '/products/:id/image',
    }),
    ApiParam({
      name: 'id',
      required: true,
      type: String,
      description: 'Product Id',
      example: '98741050-596d-4f7c-b419-44675285c4f2',
    }),
    ApiNoContentResponse(),
    ErrorDocs(),
  );
}
