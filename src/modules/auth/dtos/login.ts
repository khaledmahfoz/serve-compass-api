import { ILogin } from '@interfaces/auth/login';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsBoolean,
  IsEmail,
  IsNotEmpty,
  IsStrongPassword,
} from 'class-validator';

export class LoginDto implements ILogin {
  @ApiProperty({
    description: 'The email of the user',
    example: 'test@example.com',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    description: 'The password of the user',
    example: 'Password@123',
  })
  @IsStrongPassword({
    minLength: 6,
    minLowercase: 1,
    minUppercase: 1,
    minNumbers: 1,
    minSymbols: 1,
  })
  password: string;

  @ApiPropertyOptional({
    description: 'Whether to remember the user',
    example: true,
  })
  @IsBoolean()
  @IsNotEmpty()
  rememberMe: boolean;
}
