import { HttpStatus } from '@nestjs/common';

export interface IError {
  statusCode: HttpStatus;
  message: string | string[];
  error: string;
}
