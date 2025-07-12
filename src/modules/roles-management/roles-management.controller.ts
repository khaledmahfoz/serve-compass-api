import { RolesTypeEnum } from '@enums/roles-type';
import { Roles } from '@lib/guards/roles';
import { UpdateUserRoleDto } from '@modules/roles-management/dtos/update-user-role';
import {
  Body,
  Controller,
  Delete,
  HttpCode,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Patch,
  UseGuards,
} from '@nestjs/common';

import { RemoveUserRoleDocs } from './docs/remove-user-role';
import { RolesManagementDocs } from './docs/roles-management';
import { UpdateUserRoleDocs } from './docs/update-user-role';
import { RolesManagementService } from './roles-management.service';

@UseGuards(Roles(RolesTypeEnum.ADMIN))
@RolesManagementDocs()
@Controller('roles-management')
export class RolesManagementController {
  constructor(
    private readonly rolesManagementService: RolesManagementService,
  ) {}

  @UpdateUserRoleDocs()
  @HttpCode(HttpStatus.NO_CONTENT)
  @Patch('users/:id/role')
  async updateUserRole(
    @Param('id', ParseUUIDPipe) userId: string,
    @Body() updateUserRoleDto: UpdateUserRoleDto,
  ): Promise<void> {
    await this.rolesManagementService.updateUserRole(
      userId,
      updateUserRoleDto.roleId,
    );
  }

  @RemoveUserRoleDocs()
  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete('users/:id/role')
  async removeUserRole(
    @Param('id', ParseUUIDPipe) userId: string,
  ): Promise<void> {
    await this.rolesManagementService.removeUserRole(userId);
  }
}
