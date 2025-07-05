import { ISendVerifyEmail } from '@interfaces/auth/send-verify-email';
import { ApiProperty } from '@nestjs/swagger';
import { IsEmail } from 'class-validator';

export class SendVerifyEmailDto implements ISendVerifyEmail {
  @ApiProperty({
    description: 'The email of the user',
    example: 'test@example.com',
  })
  @IsEmail()
  email: string;
}
