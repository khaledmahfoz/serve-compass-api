import { AuthProvidersEnum } from '@enums/auth-providers';
import { IProviderUser } from '@interfaces/auth/provider-user';
import { IRegister } from '@interfaces/auth/register';
import { IUser } from '@interfaces/users/user';
import { saltRounds } from '@lib/constants/salt-rounds';
import { AuthenticationMessages } from '@lib/messages/authentication';
import { UsersService } from '@modules/users/users.service';
import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(private readonly usersService: UsersService) {}

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
    // TODO: Send email verification
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
}
