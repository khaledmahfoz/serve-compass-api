import { randomBytes } from 'node:crypto';

import { UserRole } from '@entities/user-role';
import { AuthProvidersEnum } from '@enums/auth-providers';
import { RolesTypeEnum } from '@enums/roles-type';
import { IProviderUser } from '@interfaces/auth/provider-user';
import { saltRounds } from '@lib/constants/salt-rounds';
import { AuthenticationMessages } from '@lib/messages/authentication';
import { TokensService } from '@lib/services/tokens';
import { RolesService } from '@modules/roles/roles.service';
import { UsersService } from '@modules/users/users.service';
import { InjectQueue } from '@nestjs/bullmq';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { ConflictException, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { Queue } from 'bullmq';
import { Cache } from 'cache-manager';
import { Repository } from 'typeorm';

import { AddUserRoleDto } from './dtos/add-user-role';

@Injectable()
export class RolesManagementService {
  constructor(
    private readonly usersService: UsersService,
    private readonly rolesService: RolesService,
    @InjectRepository(UserRole)
    private readonly rolesManagementRepository: Repository<UserRole>,
    private readonly tokensService: TokensService,
    @InjectQueue('emailQueue') private readonly emailQueue: Queue,
    @Inject(CACHE_MANAGER) private readonly cacheManager: Cache,
  ) {}

  async addUserRole(addUserRoleDto: AddUserRoleDto): Promise<void> {
    const existingUser = await this.usersService.exists(addUserRoleDto.email);
    if (existingUser) {
      throw new ConflictException(
        AuthenticationMessages.USER_WITH_THIS_EMAIL_ALREADY_EXISTS,
      );
    }
    const randomPassword = randomBytes(16).toString('hex');

    const hashedPassword = await bcrypt.hash(randomPassword, saltRounds);

    const user = {
      fullname: addUserRoleDto.fullname,
      email: addUserRoleDto.email,
      picture: null,
      provider: AuthProvidersEnum.LOCAL,
      emailVerified: false,
      password: hashedPassword,
    } satisfies IProviderUser;

    const createdUser = await this.usersService.saveUser(user);
    const role = await this.rolesService.checkIfRoleIsAssignable(
      addUserRoleDto.roleId,
    );
    const newUserRole = this.rolesManagementRepository.create({
      user: createdUser,
      role,
    });
    await this.rolesManagementRepository.save(newUserRole);
    await this.cacheManager.set(`roles:${newUserRole.user.id}`, role.type);
    const token = await this.tokensService.setEmailVerificationToken(
      addUserRoleDto.email,
    );
    await this.emailQueue.add('sendVerificationEmail', {
      email: addUserRoleDto.email,
      token,
    });
  }

  async updateUserRole(userId: string, roleId: string): Promise<void> {
    const user = await this.usersService.checkIfPasswordProvider(userId);

    const role = await this.rolesService.checkIfRoleIsAssignable(roleId);

    const existingUserRole = await this.rolesManagementRepository.findOne({
      where: { user: { id: userId } },
      relations: ['role'],
    });

    await this.cacheManager.set(`roles:${user.id}`, role.type);

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
    await this.usersService.deleteUser(userId, true);
    await this.cacheManager.del(`roles:${userId}`);
  }

  async getUserRole(userId: string): Promise<RolesTypeEnum | undefined> {
    const cachedRole = await this.cacheManager.get<RolesTypeEnum>(
      `roles:${userId}`,
    );
    if (cachedRole) return cachedRole;

    const userRole = await this.rolesManagementRepository.findOne({
      where: { user: { id: userId } },
      relations: ['role'],
    });
    return userRole?.role?.type;
  }
}
