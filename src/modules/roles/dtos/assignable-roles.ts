import { RolesTypeEnum } from '@enums/roles-type';
import { IRole } from '@interfaces/roles/role';
import { ApiProperty } from '@nestjs/swagger';

export class AssignableRolesDto implements IRole {
  @ApiProperty({
    description: 'The ID of the role',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  id: string;

  @ApiProperty({
    description: 'The description of the role',
    example: 'This is a description of the role',
  })
  description?: string;

  @ApiProperty({
    description: 'The type of the role',
    example: RolesTypeEnum.MODERATOR,
  })
  type: Exclude<RolesTypeEnum, RolesTypeEnum.ADMIN>;
}
