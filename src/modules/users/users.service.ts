import { User } from '@entities/user';
import { AuthProvidersEnum } from '@enums/auth-providers';
import { IProviderUser } from '@interfaces/auth/provider-user';
import { IUpdateUser } from '@interfaces/users/update-user';
import { IUser } from '@interfaces/users/user';
import {
  BadRequestException,
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

  async verifyEmail(email: string): Promise<void> {
    await this.usersRepository.update({ email }, { emailVerified: true });
  }

  async deleteUser(id: string): Promise<void> {
    await this.usersRepository.delete(id);
  }

  async checkIfCandidateStaff(userId: string): Promise<IUser> {
    const user = await this.getUser(userId);
    if (user.provider !== AuthProvidersEnum.LOCAL || !user.emailVerified)
      throw new BadRequestException(
        'user is signed up with a social provider or email not verified',
      );
    return user;
  }
}
