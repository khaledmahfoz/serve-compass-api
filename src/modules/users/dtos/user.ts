import { AuthProvidersEnum } from '@enums/auth-providers';
import { RolesTypeEnum } from '@enums/roles-type';
import { IUserRole } from '@interfaces/user-roles/user-role';
import { IUser } from '@interfaces/users/user';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Exclude, Expose, Transform } from 'class-transformer';

export class UserDto implements IUser {
  @ApiProperty({
    description: 'The id of the user',
    example: '98741050-596d-4f7c-b419-44675285c4f2',
  })
  id: string;

  @Exclude({ toClassOnly: true })
  provider: AuthProvidersEnum;

  @ApiProperty({
    description: 'The email of the user',
    example: 'john.doe@example.com',
  })
  email: string;

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

  @Exclude({ toClassOnly: true })
  userRole?: IUserRole | null;

  @ApiPropertyOptional({
    description: 'The role of the user',
    example: RolesTypeEnum.MODERATOR,
    enum: RolesTypeEnum,
  })
  @Expose({
    groups: [RolesTypeEnum.ADMIN, RolesTypeEnum.MODERATOR, RolesTypeEnum.STAFF],
  })
  @Transform(
    ({ obj }) => {
      return obj.userRole?.role?.type || null;
    },
    { toClassOnly: true },
  )
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
  picture: string | null;

  @Exclude({ toClassOnly: true })
  password: string | null;

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
