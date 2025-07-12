import { applyDecorators } from '@nestjs/common';
import { ApiNoContentResponse, ApiOperation } from '@nestjs/swagger';

export function LogoutDocs(): MethodDecorator {
  return applyDecorators(
    ApiOperation({
      description: 'Logout a user',
      summary: '/auth/logout',
    }),
    ApiNoContentResponse(),
  );
}
