import { RolesTypeEnum } from '@enums/roles-type';
import { Roles } from '@lib/decorators/roles';
import { RolesGuard } from '@lib/guards/roles';
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
  Post,
  UseGuards,
} from '@nestjs/common';

import { AddUserRoleDocs } from './docs/add-user-role';
import { RemoveUserRoleDocs } from './docs/remove-user-role';
import { RolesManagementDocs } from './docs/roles-management';
import { UpdateUserRoleDocs } from './docs/update-user-role';
import { AddUserRoleDto } from './dtos/add-user-role';
import { RolesManagementService } from './roles-management.service';

@UseGuards(RolesGuard)
@Roles(RolesTypeEnum.ADMIN)
@RolesManagementDocs()
@Controller('roles-management')
export class RolesManagementController {
  constructor(
    private readonly rolesManagementService: RolesManagementService,
  ) {}

  @AddUserRoleDocs()
  @HttpCode(HttpStatus.NO_CONTENT)
  @Post('users')
  async addUserRole(@Body() addUserRoleDto: AddUserRoleDto): Promise<void> {
    await this.rolesManagementService.addUserRole(addUserRoleDto);
  }

  @UpdateUserRoleDocs()
  @HttpCode(HttpStatus.NO_CONTENT)
  @Patch('users/:id')
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
  @Delete('users/:id')
  async removeUserRole(
    @Param('id', ParseUUIDPipe) userId: string,
  ): Promise<void> {
    await this.rolesManagementService.removeUserRole(userId);
  }
}
