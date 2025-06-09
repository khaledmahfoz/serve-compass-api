import { ErrorDocs } from '@lib/docs/error';
import { applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiBody, ApiNoContentResponse } from '@nestjs/swagger';

import { UpdateCategoryDto } from '../dtos/update-category.dto';

export function UpdateCategoryDocs(): MethodDecorator {
  return applyDecorators(
    ApiOperation({
      description: 'Update a category.',
    }),
    ApiBody({
      type: UpdateCategoryDto,
    }),
    ApiNoContentResponse(),
    ErrorDocs(),
  );
}
