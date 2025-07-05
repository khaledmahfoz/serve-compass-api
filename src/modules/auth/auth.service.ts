import { randomUUID } from 'crypto';

import { AuthProvidersEnum } from '@enums/auth-providers';
import { IProviderUser } from '@interfaces/auth/provider-user';
import { IRegister } from '@interfaces/auth/register';
import { IUser } from '@interfaces/users/user';
import { saltRounds } from '@lib/constants/salt-rounds';
import { AuthenticationMessages } from '@lib/messages/authentication';
import { UsersService } from '@modules/users/users.service';
import { InjectQueue } from '@nestjs/bullmq';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import {
  BadRequestException,
  ConflictException,
  Inject,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { Queue } from 'bullmq';
import { Cache } from 'cache-manager';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    @Inject(CACHE_MANAGER)
    private readonly cacheManager: Cache,
    @InjectQueue('emailQueue') private readonly emailQueue: Queue,
  ) {}

  async loginWithProvider(userData: IProviderUser): Promise<IUser> {
    let user = await this.usersService.findUserByEmail(userData.email);

    user ??= await this.usersService.saveUser(userData);

    return user;
  }

  async register(registerDto: IRegister): Promise<void> {
    const { email, password, fullname, firstname, lastname } = registerDto;
    const existingUser = await this.usersService.exists(email);
    if (existingUser) {
      throw new ConflictException(
        AuthenticationMessages.USER_WITH_THIS_EMAIL_ALREADY_EXISTS,
      );
    }
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const user = {
      fullname: fullname,
      email: email,
      firstname: firstname,
      lastname: lastname,
      picture: null,
      provider: AuthProvidersEnum.LOCAL,
      emailVerified: false,
      password: hashedPassword,
    } satisfies IProviderUser;

    await this.usersService.saveUser(user);
    const token = await this.generateVerificationToken(email);
    await this.emailQueue.add('sendVerificationEmail', {
      email,
      token,
    });
  }

  async validateUser(email: string, password: string): Promise<IUser> {
    const user = await this.usersService.findUserByEmail(email);
    if (!user || !user.password)
      throw new UnauthorizedException(
        AuthenticationMessages.INVALID_CREDENTIALS,
      );
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid)
      throw new UnauthorizedException(
        AuthenticationMessages.INVALID_CREDENTIALS,
      );
    return user;
  }

  async generateVerificationToken(email: string): Promise<string> {
    const token = randomUUID();
    await this.cacheManager.set(
      `verification-tokens:${token}`,
      email,
      24 * 60 * 60,
    );
    return token;
  }

  async verifyEmailByToken(token: string): Promise<void> {
    const email = await this.cacheManager.get<string>(
      `verification-tokens:${token}`,
    );
    if (!email) throw new NotFoundException('Invalid verification token');
    await this.usersService.verifyEmail(email);
    await this.cacheManager.del(`verification-tokens:${token}`);
  }

  async sendVerifyEmail(email: string): Promise<void> {
    const existingUser = await this.usersService.findUserByEmail(email);
    if (!existingUser) throw new NotFoundException('user not found');
    if (
      existingUser.provider !== AuthProvidersEnum.LOCAL ||
      existingUser.emailVerified
    ) {
      throw new BadRequestException('email is already verified');
    }
    const token = await this.generateVerificationToken(email);
    await this.emailQueue.add('sendVerificationEmail', {
      email,
      token,
    });
  }
}
