import { ICreateCategory } from '@interfaces/categories/create-category';
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
} from 'class-validator';

export class CreateCategoryDto implements ICreateCategory {
  @ApiProperty({
    description: 'The name of the category',
    example: 'Burgers',
  })
  @IsString({ message: 'name must be a valid string' })
  @IsNotEmpty({ message: 'name is required' })
  name: string;

  @ApiPropertyOptional({
    description: 'The order of the category',
    example: 1,
  })
  @IsOptional()
  @Type(() => Number)
  @IsPositive({ message: 'order must be a positive number' })
  @IsInt({ message: 'order must be an integer' })
  order?: number;

  @ApiProperty({
    description: 'Whether the category is active',
    example: true,
  })
  @IsBoolean({ message: 'isActive must be a boolean' })
  @IsNotEmpty({ message: 'isActive is required' })
  isActive: boolean;

  @ApiPropertyOptional({
    description: 'The description of the category',
    example: 'Burgers with fries',
  })
  @IsString({ message: 'description must be a valid string' })
  @IsOptional()
  description?: string;

  @ApiPropertyOptional({
    description: 'The image of the category',
    example: 'https://example.com/image.jpg',
  })
  @IsString({ message: 'image must be a valid string' })
  @IsOptional()
  image?: string;

  @ApiProperty({
    description: 'The user who created the category',
    example: 'moderator@restaurant.com',
  })
  @IsEmail({}, { message: 'createdBy must be a valid email' })
  createdBy: string = 'moderator@restaurant.com';
}
