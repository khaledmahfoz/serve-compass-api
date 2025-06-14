import { applyDecorators } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

export function ProductsDocs(): MethodDecorator & ClassDecorator {
  return applyDecorators(ApiTags('Products'));
}
