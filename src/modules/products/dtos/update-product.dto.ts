import { IUpdateProduct } from '@interfaces/products/update-product';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsInt,
  IsBoolean,
  IsOptional,
  IsPositive,
  IsString,
  IsEmail,
  IsNumber,
} from 'class-validator';
export class UpdateProductDto implements IUpdateProduct {
  @ApiProperty({
    description: 'The name of the product',
    example: 'Burger',
  })
  @IsOptional()
  @IsString({ message: 'name must be a valid string' })
  name?: string;

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
  @IsOptional()
  isActive?: boolean;

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

  @ApiPropertyOptional({
    description: 'The calories of the product',
    example: 100,
  })
  @IsNumber({}, { message: 'calories must be a number' })
  @IsOptional()
  calories?: number;

  @ApiProperty({
    description: 'The user who updated the product',
    example: 'moderator@restaurant.com',
  })
  @IsEmail({}, { message: 'updatedBy must be a valid email' })
  updatedBy: string = 'moderator@restaurant.com';
}
