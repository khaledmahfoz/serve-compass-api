import { ICategory } from '@interfaces/categories/category';
import { ApiProperty } from '@nestjs/swagger';

export class CategoryDto implements ICategory {
  @ApiProperty({
    description: 'The id of the category',
    example: '98741050-596d-4f7c-b419-44675285c4f2',
  })
  id: string;

  @ApiProperty({
    description: 'The name of the category',
    example: 'Burgers',
  })
  name: string;

  @ApiProperty({
    description: 'The visible order of the category',
    example: 1,
  })
  order: number;

  @ApiProperty({
    description: 'The visibility of the category',
    example: true,
  })
  isActive: boolean;

  @ApiProperty({
    description: 'The description of the category',
    example: 'Burgers with fries',
  })
  description?: string;

  @ApiProperty({
    description: 'The image of the category',
  })
  image?: string;

  @ApiProperty({
    description: 'The date the category was created',
    example: '2021-01-01',
  })
  createdAt: Date;

  @ApiProperty({
    description: 'The date the category was updated',
    example: '2021-01-01',
  })
  updatedAt: Date;

  @ApiProperty({
    description: 'The user who created the category',
    example: 'moderator@restaurant.com',
  })
  createdBy: string;

  @ApiProperty({
    description: 'The user who updated the category',
    example: 'admin@restaurant.com',
  })
  updatedBy: string;
}
