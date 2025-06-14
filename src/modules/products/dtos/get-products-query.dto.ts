import { IGetProductsQuery } from '@interfaces/products/get-products-query';
import { PerPageLimit } from '@lib/constants/per-page-limit';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsInt, IsPositive } from 'class-validator';

export class GetProductsQueryDto implements IGetProductsQuery {
  @ApiPropertyOptional({
    example: 1,
    description: 'The page number for pagination (default: 1)',
  })
  @Type(() => Number)
  @IsInt({ message: 'page must be an integer' })
  @IsPositive({ message: 'page must be a positive number' })
  page: number = 1;

  @ApiPropertyOptional({
    example: 10,
    description: 'The number of products per page (default: 10)',
  })
  @Type(() => Number)
  @IsInt({ message: 'limit must be an integer' })
  @IsPositive({ message: 'limit must be a positive number' })
  limit: number = PerPageLimit;
}
