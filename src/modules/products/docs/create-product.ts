import { ErrorDocs } from '@lib/docs/error';
import { applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiBody, ApiCreatedResponse } from '@nestjs/swagger';

import { CreateProductDto } from '../dtos/create-product.dto';

export function CreateProductDocs(): MethodDecorator {
  return applyDecorators(
    ApiOperation({
      description: 'Create a new product.',
      summary: '/products',
    }),
    ApiBody({
      type: CreateProductDto,
    }),
    ApiCreatedResponse(),
    ErrorDocs(),
  );
}
