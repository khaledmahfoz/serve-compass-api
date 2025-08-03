import { RolesTypeEnum } from '@enums/roles-type';
import { IRole } from '@interfaces/roles/role';
import { Roles } from '@lib/decorators/roles';
import { RolesGuard } from '@lib/guards/roles';
import { Controller, Get, UseGuards } from '@nestjs/common';

import { GetAssignableRolesDocs } from './docs/get-assignable-roles';
import { RolesDocs } from './docs/roles';
import { RolesService } from './roles.service';

@UseGuards(RolesGuard)
@Roles(RolesTypeEnum.ADMIN)
@RolesDocs()
@Controller('roles')
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}

  @Get()
  @GetAssignableRolesDocs()
  getAssignableRoles(): Promise<IRole[]> {
    return this.rolesService.getAssignableRoles();
  }
}
