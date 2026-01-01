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
  Max,
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
  @Max(1000, { message: 'order must be less than or equal to 1000' })
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
    description: 'The calories of the product',
    example: 100,
  })
  @IsNumber({}, { message: 'calories must be a number' })
  @IsPositive({ message: 'calories must be a positive number' })
  @Max(10000, { message: 'calories must be less than or equal to 10000' })
  @IsOptional()
  calories?: number;

  @ApiPropertyOptional({
    description: 'The price of the product',
    example: 10.99,
  })
  @IsNumber({}, { message: 'price must be a number' })
  @IsPositive({ message: 'price must be a positive number' })
  @Max(100000, { message: 'price must be less than or equal to 100000' })
  @IsOptional()
  price?: number;

  @ApiProperty({
    description: 'The user who updated the product',
    example: 'moderator@restaurant.com',
  })
  @IsEmail({}, { message: 'updatedBy must be a valid email' })
  updatedBy: string = 'moderator@restaurant.com';
}
