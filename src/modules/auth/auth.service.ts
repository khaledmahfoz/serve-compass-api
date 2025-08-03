import { AuthProvidersEnum } from '@enums/auth-providers';
import { IChangeEmail } from '@interfaces/auth/change-email';
import { IChangePassword } from '@interfaces/auth/change-password';
import { IProviderUser } from '@interfaces/auth/provider-user';
import { IRegister } from '@interfaces/auth/register';
import { IUser } from '@interfaces/users/user';
import { saltRounds } from '@lib/constants/salt-rounds';
import { AuthenticationMessages } from '@lib/messages/authentication';
import { TokensService } from '@lib/services/tokens';
import { UsersService } from '@modules/users/users.service';
import { InjectQueue } from '@nestjs/bullmq';
import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { Queue } from 'bullmq';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    @InjectQueue('emailQueue') private readonly emailQueue: Queue,
    private readonly tokensService: TokensService,
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
    const token = await this.tokensService.setEmailVerificationToken(email);
    await this.emailQueue.add('sendVerificationEmail', { email, token });
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

  async verifyEmailByToken(token: string): Promise<void> {
    const email = await this.tokensService.getEmailVerificationToken(token);
    if (!email)
      throw new NotFoundException(
        AuthenticationMessages.INVALID_VERIFICATION_TOKEN,
      );
    await this.usersService.verifyEmail(email);
    await this.tokensService.deleteEmailVerificationToken(token);
  }

  async sendVerifyEmail(email: string): Promise<void> {
    const existingUser = await this.usersService.findUserByEmail(email);
    if (!existingUser)
      throw new NotFoundException(AuthenticationMessages.USER_NOT_FOUND);
    if (
      existingUser.provider !== AuthProvidersEnum.LOCAL ||
      existingUser.emailVerified
    ) {
      throw new BadRequestException(
        AuthenticationMessages.EMAIL_ALREADY_VERIFIED,
      );
    }
    const token = await this.tokensService.setEmailVerificationToken(email);
    await this.emailQueue.add('sendVerificationEmail', { email, token });
  }

  async changeEmail(
    userId: string,
    changeEmailDto: IChangeEmail,
  ): Promise<void> {
    const currentUser = await this.usersService.getUser(userId);
    const { email, password } = changeEmailDto;

    await this.validateUser(currentUser.email, password);

    const existingUser = await this.usersService.exists(email);
    if (existingUser)
      throw new ConflictException(
        AuthenticationMessages.USER_WITH_THIS_EMAIL_ALREADY_EXISTS,
      );

    await this.usersService.updateUser(userId, { email });
    await this.emailQueue.add('sendUpdateEmail', { email });
  }

  async changePassword(
    userId: string,
    changePasswordDto: IChangePassword,
  ): Promise<void> {
    const { currentPassword, newPassword } = changePasswordDto;
    const currentUser = await this.usersService.getUser(userId);
    await this.validateUser(currentUser.email, currentPassword);
    const hashedPassword = await bcrypt.hash(newPassword, saltRounds);
    await this.usersService.updateUser(userId, { password: hashedPassword });
    await this.emailQueue.add('passwordUpdated', {
      email: currentUser.email,
    });
  }

  async sendUpdatePasswordEmail(email: string): Promise<void> {
    const existingUser = await this.usersService.findUserByEmail(email);
    if (!existingUser)
      throw new NotFoundException(AuthenticationMessages.USER_NOT_FOUND);
    await this.usersService.checkIfPasswordProvider(existingUser.id);
    const token = await this.tokensService.setPasswordUpdateToken(email);
    await this.emailQueue.add('sendUpdatePassword', { email, token });
  }

  async updatePasswordByToken(
    token: string,
    newPassword: string,
  ): Promise<void> {
    const email = await this.tokensService.getPasswordUpdateToken(token);
    if (!email)
      throw new NotFoundException(
        AuthenticationMessages.INVALID_VERIFICATION_TOKEN,
      );
    const hashedPassword = await bcrypt.hash(newPassword, saltRounds);
    await this.usersService.updateUserByEmail(email, {
      password: hashedPassword,
    });
    await this.tokensService.deletePasswordUpdateToken(token);
  }
}
