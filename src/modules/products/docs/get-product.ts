import { ErrorDocs } from '@lib/docs/error';
import { applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiOkResponse, ApiParam } from '@nestjs/swagger';

import { ProductDto } from '../dtos/product';

export function GetProductDocs(): MethodDecorator {
  return applyDecorators(
    ApiOperation({
      description: 'Retrieve a product by Id.',
      summary: '/products/:id',
    }),
    ApiParam({
      name: 'id',
      required: true,
      type: String,
      description: 'Product Id',
    }),
    ApiOkResponse({
      type: ProductDto,
    }),
    ErrorDocs(),
  );
}
