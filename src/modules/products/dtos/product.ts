import { ICategory } from '@interfaces/categories/category';
import { IProduct } from '@interfaces/products/product';
import { CategoryDto } from '@modules/categories/dtos/category';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
export class ProductDto implements IProduct {
  @ApiProperty({
    description: 'The id of the product',
    example: '98741050-596d-4f7c-b419-44675285c4f2',
  })
  id: string;

  @ApiProperty({
    description: 'The name of the product',
    example: 'Burger',
  })
  name: string;

  @ApiProperty({
    description: 'The visible order of the product',
    example: 1,
  })
  order: number;

  @ApiProperty({
    description: 'The visibility of the product',
    example: true,
  })
  isActive: boolean;

  @ApiProperty({
    description: 'The price of the product',
    example: 10.99,
  })
  price: number;

  @ApiPropertyOptional({
    description: 'The category data of the product',
    type: CategoryDto,
  })
  category: ICategory;

  @ApiProperty({
    description: 'The category id of the product',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  categoryId: string;

  @ApiProperty({
    description: 'The calories of the product',
    example: 100,
  })
  calories: number;

  @ApiProperty({
    description: 'The description of the product',
    example: 'Burgers with fries',
  })
  description?: string;

  @ApiProperty({
    description: 'The image of the product',
  })
  image?: string;

  @ApiProperty({
    description: 'The date the product was created',
    example: '2021-01-01',
  })
  createdAt: Date;

  @ApiProperty({
    description: 'The date the product was updated',
    example: '2021-01-01',
  })
  updatedAt: Date;

  @ApiProperty({
    description: 'The user who created the product',
    example: 'moderator@restaurant.com',
  })
  createdBy: string;

  @ApiProperty({
    description: 'The user who updated the product',
    example: 'admin@restaurant.com',
  })
  updatedBy: string;
}
