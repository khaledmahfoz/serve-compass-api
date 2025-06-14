import { ICreateProduct } from '@interfaces/products/create-product';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsInt,
  IsNotEmpty,
  IsBoolean,
  IsOptional,
  IsPositive,
  IsString,
  IsEmail,
  IsNumber,
} from 'class-validator';

export class CreateProductDto implements ICreateProduct {
  @ApiProperty({
    description: 'The name of the product',
    example: 'Burger',
  })
  @IsString({ message: 'name must be a valid string' })
  @IsNotEmpty({ message: 'name is required' })
  name: string;

  @ApiPropertyOptional({
    description: 'The order of the product',
    example: 1,
  })
  @IsOptional()
  @Type(() => Number)
  @IsPositive({ message: 'order must be a positive number' })
  @IsInt({ message: 'order must be an integer' })
  order?: number;

  @ApiProperty({
    description: 'Whether the product is active',
    example: true,
  })
  @IsBoolean({ message: 'isActive must be a boolean' })
  @IsNotEmpty({ message: 'isActive is required' })
  isActive: boolean;

  @ApiProperty({
    description: 'The price of the product',
    example: 100,
  })
  @IsNumber({}, { message: 'price must be a number' })
  @IsNotEmpty({ message: 'price is required' })
  price: number;

  @ApiProperty({
    description: 'The category id of the product',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @IsString({ message: 'categoryId must be a valid string' })
  @IsNotEmpty({ message: 'categoryId is required' })
  categoryId: string;

  @ApiProperty({
    description: 'The calories of the product',
    example: 100,
  })
  @IsNumber({}, { message: 'calories must be a number' })
  @IsNotEmpty({ message: 'calories field is required' })
  calories: number;

  @ApiPropertyOptional({
    description: 'The description of the product',
    example: 'Burger with fries',
  })
  @IsString({ message: 'description must be a valid string' })
  @IsOptional()
  description?: string;

  @ApiPropertyOptional({
    description: 'The image of the product',
    example: 'https://example.com/image.jpg',
  })
  @IsString({ message: 'image must be a valid string' })
  @IsOptional()
  image?: string;

  @ApiProperty({
    description: 'The user who created the product',
    example: 'moderator@restaurant.com',
  })
  @IsEmail({}, { message: 'createdBy must be a valid email' })
  createdBy: string = 'moderator@restaurant.com';
}
