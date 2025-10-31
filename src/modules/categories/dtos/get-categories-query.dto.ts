import { IGetCategoriesQuery } from '@interfaces/categories/get-categories-query';
import { PerPageLimit } from '@lib/constants/per-page-limit';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsInt, IsPositive, Max } from 'class-validator';

export class GetCategoriesQueryDto implements IGetCategoriesQuery {
  @ApiPropertyOptional({
    example: 1,
    description: 'The page number for pagination (default: 1)',
  })
  @Type(() => Number)
  @IsInt({ message: 'page must be an integer' })
  @IsPositive({ message: 'page must be a positive number' })
  @Max(1000, { message: 'page must be less than or equal to 1000' })
  page: number = 1;

  @ApiPropertyOptional({
    example: 10,
    description: 'The number of categories per page (default: 10)',
  })
  @Type(() => Number)
  @IsInt({ message: 'limit must be an integer' })
  @IsPositive({ message: 'limit must be a positive number' })
  @Max(1000, { message: 'limit must be less than or equal to 1000' })
  limit: number = PerPageLimit;
}
