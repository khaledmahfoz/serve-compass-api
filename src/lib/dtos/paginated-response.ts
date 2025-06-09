import { IPaginationMetaData } from '@interfaces/helpers/pagination-metadata';
import { WithPaginationMetadata } from '@interfaces/helpers/with-pagination-metadata';
import { ApiProperty } from '@nestjs/swagger';

export class PaginationMetadataDto implements IPaginationMetaData {
  @ApiProperty({ description: 'Current page number', example: 1 })
  page: number;

  @ApiProperty({ description: 'Number of items per page', example: 10 })
  perPage: number;

  @ApiProperty({ description: 'Total number of items', example: 100 })
  total: number;

  @ApiProperty({ description: 'Last page number', example: 10 })
  lastPage: number;
}

export class BasePaginatedDto<T> implements WithPaginationMetadata<T> {
  @ApiProperty({
    type: PaginationMetadataDto,
    description: 'Pagination metadata',
  })
  metadata: PaginationMetadataDto;

  data: T;
}
