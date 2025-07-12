import { IUser } from '@interfaces/users/user';
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';

import { AuthService } from '../auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super({
      usernameField: 'email',
      session: true,
    });
  }

  async validate(email: string, password: string): Promise<Partial<IUser>> {
    const user = await this.authService.validateUser(email, password);
    return user;
  }
}
