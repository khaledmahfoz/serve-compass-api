import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, IsUUID } from 'class-validator';

export class AddUserRoleDto {
  @ApiProperty({
    description: 'The email of the user to add the role to',
    example: 'john.doe@example.com',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    description: 'The fullname of the user to add the role to',
    example: 'John Doe',
  })
  @IsString()
  fullname: string;

  @ApiProperty({
    description: 'The ID of the role to add to the user',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @IsUUID()
  roleId: string;
}
