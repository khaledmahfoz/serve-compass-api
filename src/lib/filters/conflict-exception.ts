import { IError } from '@interfaces/helpers/error';
import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpStatus,
} from '@nestjs/common';
import { FastifyReply } from 'fastify';
import { QueryFailedError } from 'typeorm';

interface UniqueConstraintError extends Error {
  code?: string;
  detail?: string;
  table?: string;
  constraint?: string;
}

@Catch(QueryFailedError)
export class UniqueConstraintFilter implements ExceptionFilter {
  catch(
    exception: QueryFailedError & { driverError?: UniqueConstraintError },
    host: ArgumentsHost,
  ): void {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<FastifyReply>();

    if (exception.driverError?.code === '23505') {
      const detail = exception.driverError.detail ?? '';
      const match = /Key \((.*)\)=\((.*)\) already exists/.exec(detail);
      if (match) {
        const keyNames = match[1].split(', ');
        const keyValues = match[2].split(', ');

        const messages = keyNames.map((name, index) => {
          const fieldName = name.trim();
          const stringWithoutQuotes = fieldName.replace(/(^"|"$)/g, '');
          const fieldValue = keyValues[index]?.trim() || '';
          return `${stringWithoutQuotes} with value '${fieldValue}' already exists`;
        });

        const errorResponse: IError = {
          statusCode: HttpStatus.CONFLICT,
          message: messages.length > 1 ? messages : messages[0],
          error: 'Conflict',
        };

        response.status(HttpStatus.CONFLICT).send(errorResponse);
        return;
      }
    }

    throw exception;
  }
}
