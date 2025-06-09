import { applyDecorators } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

export function CategoriesDocs(): MethodDecorator & ClassDecorator {
  return applyDecorators(ApiTags('Categories'));
}
