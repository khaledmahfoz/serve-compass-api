import { applyDecorators } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

export function RolesManagementDocs(): MethodDecorator & ClassDecorator {
  return applyDecorators(ApiTags('Roles Management'));
}
