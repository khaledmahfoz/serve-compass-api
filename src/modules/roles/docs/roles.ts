import { applyDecorators } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

export function RolesDocs(): MethodDecorator & ClassDecorator {
  return applyDecorators(ApiTags('Roles'));
}
