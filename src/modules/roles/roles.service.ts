import { Role } from '@entities/role';
import { RolesTypeEnum } from '@enums/roles-type';
import { IRole } from '@interfaces/roles/role';
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Not, Repository } from 'typeorm';

@Injectable()
export class RolesService {
  constructor(
    @InjectRepository(Role)
    private readonly rolesRepository: Repository<Role>,
  ) {}

  async getAssignableRoles(): Promise<IRole[]> {
    return this.rolesRepository.find({
      where: { type: Not(RolesTypeEnum.ADMIN) },
    });
  }

  async checkIfRoleIsAssignable(roleId: string): Promise<IRole> {
    const role = await this.rolesRepository.findOne({ where: { id: roleId } });
    if (!role) throw new NotFoundException('Role not found');
    if (role.type === RolesTypeEnum.ADMIN)
      throw new BadRequestException(
        'Admin role cannot be assigned to any staff member',
      );
    return role;
  }
}
