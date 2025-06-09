import { IUpdateCategory } from '@interfaces/categories/update-category';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsInt,
  IsBoolean,
  IsOptional,
  IsPositive,
  IsString,
  IsEmail,
} from 'class-validator';

export class UpdateCategoryDto implements IUpdateCategory {
  @ApiProperty({
    description: 'The name of the category',
    example: 'Burgers',
  })
  @IsOptional()
  @IsString({ message: 'name must be a valid string' })
  name?: string;

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
  @IsOptional()
  isActive?: boolean;

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
    description: 'The user who updated the category',
    example: 'moderator@restaurant.com',
  })
  @IsEmail({}, { message: 'updatedBy must be a valid email' })
  updatedBy: string = 'moderator@restaurant.com';
}
