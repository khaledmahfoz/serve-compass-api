import { User } from '@entities/user';
import { AuthProvidersEnum } from '@enums/auth-providers';
import { RolesTypeEnum } from '@enums/roles-type';
import { IProviderUser } from '@interfaces/auth/provider-user';
import { IUpdateUser } from '@interfaces/users/update-user';
import { IUser } from '@interfaces/users/user';
import { AuthenticationMessages } from '@lib/messages/authentication';
import { SessionsService } from '@lib/services/sessions';
import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
    private readonly sessionsService: SessionsService,
  ) {}

  async findUserByEmail(email: string): Promise<IUser | null> {
    return this.usersRepository.findOne({
      where: { email },
      relations: { userRole: { role: true } },
    });
  }

  async getUser(id: string): Promise<IUser> {
    const user = await this.usersRepository.findOne({
      where: { id },
      relations: { userRole: { role: true } },
    });
    if (!user) throw new NotFoundException('user not found');
    return user;
  }

  async exists(email: string): Promise<boolean> {
    return this.usersRepository.exists({ where: { email } });
  }

  async saveUser(userData: IProviderUser): Promise<IUser> {
    const user = this.usersRepository.create(userData);
    return this.usersRepository.save(user);
  }

  async updateUser(id: string, updateUserDto: IUpdateUser): Promise<void> {
    await this.usersRepository.update(id, updateUserDto);
  }

  async updateUserByEmail(
    email: string,
    updateUserDto: IUpdateUser,
  ): Promise<void> {
    await this.usersRepository.update({ email }, updateUserDto);
  }

  async verifyEmail(email: string): Promise<void> {
    await this.usersRepository.update({ email }, { emailVerified: true });
  }

  async deleteUser(id: string, isAdmin: boolean = false): Promise<void> {
    const user = await this.getUser(id);
    if (user.userRole?.role?.type === RolesTypeEnum.ADMIN) {
      throw new ForbiddenException(
        AuthenticationMessages.ADMIN_ROLE_CANNOT_BE_REMOVED,
      );
    }
    if (user.userRole !== null && !isAdmin) {
      throw new ForbiddenException({
        message: 'staff accounts cannot be deleted',
      });
    }
    await this.usersRepository.delete(id);
    await this.sessionsService.deleteUserSessions(id);
  }

  async checkIfPasswordProvider(userId: string): Promise<IUser> {
    const user = await this.getUser(userId);
    if (user.provider !== AuthProvidersEnum.LOCAL || !user.emailVerified)
      throw new BadRequestException(
        AuthenticationMessages.USER_SIGNED_UP_WITH_SOCIAL_PROVIDER_OR_EMAIL_NOT_VERIFIED,
      );
    return user;
  }
}
