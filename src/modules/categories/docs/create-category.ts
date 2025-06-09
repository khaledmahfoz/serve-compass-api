import { ErrorDocs } from '@lib/docs/error';
import { applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiBody, ApiCreatedResponse } from '@nestjs/swagger';

import { CreateCategoryDto } from '../dtos/create-category.dto';

export function CreateCategoryDocs(): MethodDecorator {
  return applyDecorators(
    ApiOperation({
      description: 'Create a new category.',
    }),
    ApiBody({
      type: CreateCategoryDto,
    }),
    ApiCreatedResponse(),
    ErrorDocs(),
  );
}
