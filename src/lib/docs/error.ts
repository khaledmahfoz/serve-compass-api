import { ErrorDto } from '@lib/dtos/error';
import { applyDecorators } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiUnauthorizedResponse,
  ApiForbiddenResponse,
  ApiNotFoundResponse,
  ApiConflictResponse,
  ApiMethodNotAllowedResponse,
  ApiInternalServerErrorResponse,
  ApiDefaultResponse,
} from '@nestjs/swagger';

export function ErrorDocs(): MethodDecorator {
  return applyDecorators(
    ApiBadRequestResponse({
      description: 'Bad Request',
      type: ErrorDto,
    }),
    ApiUnauthorizedResponse({
      description: 'Unauthorized',
      type: ErrorDto,
    }),
    ApiForbiddenResponse({
      description: 'Forbidden',
      type: ErrorDto,
    }),
    ApiNotFoundResponse({
      description: 'Not Found',
      type: ErrorDto,
    }),
    ApiMethodNotAllowedResponse({
      description: 'Method Not Allowed',
      type: ErrorDto,
    }),
    ApiConflictResponse({
      description: 'Conflict',
      type: ErrorDto,
    }),
    ApiInternalServerErrorResponse({
      description: 'Internal Server Error',
      type: ErrorDto,
    }),
    ApiDefaultResponse({
      description: 'Any other 4XX or 5XX error',
      type: ErrorDto,
    }),
  );
}
