import { BasePaginatedDto } from '@lib/dtos/paginated-response';
import { ApiProperty } from '@nestjs/swagger';

import { CategoryDto } from './category';

export class PaginatedCategoriesDto extends BasePaginatedDto<CategoryDto[]> {
  @ApiProperty({
    type: [CategoryDto],
    description: 'The paginated categories',
  })
  data: CategoryDto[];
}
