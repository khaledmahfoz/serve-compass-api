import { RolesTypeEnum } from '@enums/roles-type';
import { IUser } from '@interfaces/users/user';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class UserDto implements Partial<IUser> {
  @ApiProperty({
    description: 'The id of the user',
    example: '98741050-596d-4f7c-b419-44675285c4f2',
  })
  id: string;

  @ApiProperty({
    description: 'The email of the user',
    example: 'john.doe@example.com',
  })
  email: string | undefined;

  @ApiProperty({
    description: 'The email verified of the user',
    example: true,
  })
  emailVerified: boolean;

  @ApiProperty({
    description: 'The full name of the user',
    example: 'John Doe',
  })
  fullname: string;

  @ApiPropertyOptional({
    description: 'The role of the user',
    example: RolesTypeEnum.MODERATOR,
    enum: RolesTypeEnum,
  })
  role?: RolesTypeEnum | null;

  @ApiPropertyOptional({
    description: 'The first name of the user',
    example: 'John',
  })
  firstname?: string;

  @ApiPropertyOptional({
    description: 'The last name of the user',
    example: 'Doe',
  })
  lastname?: string;

  @ApiPropertyOptional({
    description: 'The picture of the user',
    example: 'https://example.com/picture.jpg',
  })
  picture?: string;

  @ApiProperty({
    description: 'The joined at of the user',
    example: '2021-01-01',
  })
  joinedAt: Date;

  @ApiProperty({
    description: 'The last updated at of the user',
    example: '2021-01-01',
  })
  lastUpdatedAt: Date;
}
