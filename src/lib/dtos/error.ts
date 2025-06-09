import { IError } from '@interfaces/helpers/error';
import { ApiProperty, ApiExtraModels, ApiSchema } from '@nestjs/swagger';

@ApiExtraModels()
@ApiSchema({
  description:
    'Used when an API throws an Error, typically with a HTTP error response-code (4xx, 5xx)',
})
export class ErrorDto implements IError {
  @ApiProperty({
    description: 'HTTP Error code extension.',
  })
  statusCode: number;

  @ApiProperty({
    description:
      'Explanation of the reason for the error which can be shown to a client user.',
  })
  error: string;

  @ApiProperty({
    description:
      'More details and corrective actions related to the error which can be shown to a client user.',
    type: 'array',
    items: {
      oneOf: [{ type: 'string' }, { type: 'array', items: { type: 'string' } }],
    },
  })
  message: string | string[];
}
