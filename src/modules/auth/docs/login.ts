import { ErrorDocs } from '@lib/docs/error';
import { UserDto } from '@modules/users/dtos/user';
import { applyDecorators } from '@nestjs/common';
import { ApiCreatedResponse, ApiOperation } from '@nestjs/swagger';

export function LoginDocs(): MethodDecorator {
  return applyDecorators(
    ApiOperation({
      description: 'Login a user',
      summary: '/auth/login',
    }),
    ApiCreatedResponse({
      description: 'User logged in successfully',
      type: UserDto,
    }),
    ErrorDocs(),
  );
}
