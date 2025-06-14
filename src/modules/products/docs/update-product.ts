import { ErrorDocs } from '@lib/docs/error';
import { applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiBody, ApiNoContentResponse } from '@nestjs/swagger';

import { UpdateProductDto } from '../dtos/update-product.dto';

export function UpdateProductDocs(): MethodDecorator {
  return applyDecorators(
    ApiOperation({
      description: 'Update a product.',
    }),
    ApiBody({
      type: UpdateProductDto,
    }),
    ApiNoContentResponse(),
    ErrorDocs(),
  );
}
