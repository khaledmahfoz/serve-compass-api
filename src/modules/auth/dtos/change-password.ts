import { IChangePassword } from '@interfaces/auth/change-password';
import { Match } from '@lib/decorators/match';
import { ApiProperty } from '@nestjs/swagger';
import { IsStrongPassword } from 'class-validator';

export class ChangePasswordDto implements IChangePassword {
  @ApiProperty({
    description: 'The current password of the user',
    example: 'Password@123',
  })
  @IsStrongPassword({
    minLength: 6,
    minLowercase: 1,
    minUppercase: 1,
    minNumbers: 1,
    minSymbols: 1,
  })
  currentPassword: string;

  @ApiProperty({
    description: 'The new password of the user',
    example: 'Password@123',
  })
  @IsStrongPassword({
    minLength: 6,
    minLowercase: 1,
    minUppercase: 1,
    minNumbers: 1,
    minSymbols: 1,
  })
  newPassword: string;

  @ApiProperty({
    description: 'The confirm new password of the user',
    example: 'Password@123',
  })
  @IsStrongPassword({
    minLength: 6,
    minLowercase: 1,
    minUppercase: 1,
    minNumbers: 1,
    minSymbols: 1,
  })
  @Match('newPassword', { message: 'confirm password does not match password' })
  confirmPassword: string;
}
