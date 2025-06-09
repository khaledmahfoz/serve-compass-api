import { ErrorDocs } from '@lib/docs/error';
import { applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiOkResponse, ApiParam } from '@nestjs/swagger';

import { CategoryDto } from '../dtos/category';

export function GetCategoryDocs(): MethodDecorator {
  return applyDecorators(
    ApiOperation({
      description: 'Retrieve a category by Id.',
    }),
    ApiParam({
      name: 'id',
      required: true,
      type: String,
      description: 'Category ID',
    }),
    ApiOkResponse({
      type: CategoryDto,
    }),
    ErrorDocs(),
  );
}
