import { ErrorDocs } from '@lib/docs/error';
import { applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiParam, ApiNoContentResponse } from '@nestjs/swagger';

export function DeleteProductDocs(): MethodDecorator {
  return applyDecorators(
    ApiOperation({
      description: 'Delete a product by Id.',
    }),
    ApiParam({
      name: 'id',
      required: true,
      type: String,
      description: 'Product Id',
    }),
    ApiNoContentResponse(),
    ErrorDocs(),
  );
}
