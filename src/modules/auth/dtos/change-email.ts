import { IChangeEmail } from '@interfaces/auth/change-email';
import { Match } from '@lib/decorators/match';
import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsStrongPassword } from 'class-validator';

export class ChangeEmailDto implements IChangeEmail {
  @ApiProperty({
    description: 'The new email of the user',
    example: 'test@example.com',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    description: 'The confirm new email of the user',
    example: 'test@example.com',
  })
  @IsEmail()
  @Match('email', { message: 'confirm email does not match new email' })
  confirmEmail: string;

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
}
