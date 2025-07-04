import { applyDecorators } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

export function UsersDocs(): MethodDecorator & ClassDecorator {
  return applyDecorators(ApiTags('Users'));
}
