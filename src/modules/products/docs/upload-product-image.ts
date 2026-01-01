import { ErrorDocs } from '@lib/docs/error';
import { applyDecorators } from '@nestjs/common';
import {
  ApiBody,
  ApiConsumes,
  ApiCreatedResponse,
  ApiOperation,
  ApiParam,
} from '@nestjs/swagger';

export function UploadProductImageDocs(): MethodDecorator {
  return applyDecorators(
    ApiOperation({
      description: 'Upload an image for a product by Id.',
      summary: '/products/:id/image',
    }),
    ApiParam({
      name: 'id',
      required: true,
      type: String,
      description: 'Product Id',
      example: '98741050-596d-4f7c-b419-44675285c4f2',
    }),
    ApiConsumes('multipart/form-data'),
    ApiBody({
      schema: {
        type: 'object',
        properties: {
          image: {
            description: 'The image to upload (png, jpeg, webp) (max size 3MB)',
            type: 'file',
            format: 'binary',
            example: 'image.png',
            maxLength: 3 * 1000 * 1000,
          },
        },
        required: ['image'],
      },
    }),
    ApiCreatedResponse(),
    ErrorDocs(),
  );
}
