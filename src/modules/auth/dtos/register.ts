import { IRegister } from '@interfaces/auth/register';
import { Match } from '@lib/decorators/match';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsOptional,
  IsString,
  IsStrongPassword,
} from 'class-validator';

import { LoginDto } from './login';

export class RegisterDto extends LoginDto implements IRegister {
  @ApiProperty({
    description: 'The full name of the user',
    example: 'User Name',
  })
  @IsString()
  @IsNotEmpty()
  fullname: string;

  @ApiProperty({
    description: 'The confirm password of the user',
    example: 'Password@123',
  })
  @IsStrongPassword({
    minLength: 6,
    minLowercase: 1,
    minUppercase: 1,
    minNumbers: 1,
    minSymbols: 1,
  })
  @Match('password', { message: 'confirm password does not match password' })
  confirmPassword: string;

  @ApiPropertyOptional({
    description: 'The first name of the user',
    example: 'User',
  })
  @IsString()
  @IsOptional()
  firstname?: string;

  @ApiPropertyOptional({
    description: 'The last name of the user',
    example: 'Name',
  })
  @IsString()
  @IsOptional()
  lastname?: string;
}
