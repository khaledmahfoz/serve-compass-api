import { UserRole } from '@entities/user-role';
import { SessionsService } from '@lib/services/sessions';
import { RolesService } from '@modules/roles/roles.service';
import { UsersService } from '@modules/users/users.service';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class RolesManagementService {
  constructor(
    private readonly usersService: UsersService,
    private readonly rolesService: RolesService,
    @InjectRepository(UserRole)
    private readonly rolesManagementRepository: Repository<UserRole>,
    private readonly sessionsService: SessionsService,
  ) {}

  async updateUserRole(userId: string, roleId: string): Promise<void> {
    const user = await this.usersService.checkIfCandidateStaff(userId);

    const role = await this.rolesService.checkIfRoleIsAssignable(roleId);

    const existingUserRole = await this.rolesManagementRepository.findOne({
      where: { user: { id: userId } },
      relations: ['role'],
    });

    await this.sessionsService.deleteUserSessions(userId);

    if (existingUserRole) {
      await this.rolesManagementRepository.update(existingUserRole.id, {
        role,
      });
      return;
    }
    const newUserRole = this.rolesManagementRepository.create({
      user,
      role,
    });
    await this.rolesManagementRepository.save(newUserRole);
  }

  async removeUserRole(userId: string): Promise<void> {
    await this.sessionsService.deleteUserSessions(userId);
    await this.rolesManagementRepository.delete({ user: { id: userId } });
  }
}
