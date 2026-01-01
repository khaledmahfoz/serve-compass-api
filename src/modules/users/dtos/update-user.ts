import { IUpdateUser } from '@interfaces/users/update-user';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class UpdateUserDto implements IUpdateUser {
  @ApiPropertyOptional({
    description: 'The full name of the user',
    example: 'John Doe',
  })
  @IsString()
  @IsOptional()
  fullname?: string;

  @ApiPropertyOptional({
    description: 'The first name of the user',
    example: 'John',
  })
  @IsString()
  @IsOptional()
  firstname?: string;

  @ApiPropertyOptional({
    description: 'The last name of the user',
    example: 'Doe',
  })
  @IsString()
  @IsOptional()
  lastname?: string;
}
