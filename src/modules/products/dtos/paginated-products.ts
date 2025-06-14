import { BasePaginatedDto } from '@lib/dtos/paginated-response';
import { ApiProperty } from '@nestjs/swagger';

import { ProductDto } from './product';

export class PaginatedProductsDto extends BasePaginatedDto<ProductDto[]> {
  @ApiProperty({
    type: [ProductDto],
    description: 'The paginated products',
  })
  data: ProductDto[];
}
