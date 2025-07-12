import { ErrorDocs } from '@lib/docs/error';
import { applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiOkResponse, ApiQuery } from '@nestjs/swagger';

import { PaginatedProductsDto } from '../dtos/paginated-products';

export function GetProductsDocs(): MethodDecorator {
  return applyDecorators(
    ApiOperation({
      description:
        'Retrieve a list of products based on filters provided as query parameters.',
      summary: '/products',
    }),
    ApiQuery({
      name: 'page',
      required: false,
      type: Number,
      description: 'Page number',
    }),
    ApiOkResponse({
      type: PaginatedProductsDto,
    }),
    ErrorDocs(),
  );
}
