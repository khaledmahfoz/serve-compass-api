import {
  ClassSerializerContextOptions,
  CustomDecorator,
  SetMetadata,
} from '@nestjs/common';

export const Serializer = (
  options: ClassSerializerContextOptions,
): CustomDecorator<string> => SetMetadata('serializer', options);
