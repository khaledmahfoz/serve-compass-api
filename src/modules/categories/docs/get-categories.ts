import { ErrorDocs } from '@lib/docs/error';
import { applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiOkResponse, ApiQuery } from '@nestjs/swagger';

import { PaginatedCategoriesDto } from '../dtos/paginated-categories';

export function GetCategoriesDocs(): MethodDecorator {
  return applyDecorators(
    ApiOperation({
      description:
        'Retrieve a list of categories based on filters provided as query parameters.',
      summary: '/categories',
    }),
    ApiQuery({
      name: 'page',
      required: false,
      type: Number,
      description: 'Page number',
    }),
    ApiOkResponse({
      type: PaginatedCategoriesDto,
    }),
    ErrorDocs(),
  );
}
