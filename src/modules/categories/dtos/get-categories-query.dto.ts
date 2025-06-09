import { IGetCategoriesQuery } from '@interfaces/categories/get-categories-query';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsInt, IsPositive } from 'class-validator';

export class GetCategoriesQueryDto implements IGetCategoriesQuery {
  @ApiPropertyOptional({
    example: 1,
    description: 'The page number for pagination (default: 1)',
  })
  @Type(() => Number)
  @IsInt({ message: 'page must be an integer' })
  @IsPositive({ message: 'page must be a positive number' })
  page: number = 1;
}
