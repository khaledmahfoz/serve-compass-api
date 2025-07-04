import { IProviderUser } from '@interfaces/auth/provider-user';
import { AuthenticationMessages } from '@lib/messages/authentication';
import {
  HttpException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { isArray } from 'lodash';
import { Strategy, VerifyCallback, Profile } from 'passport-google-oauth20';
import { AuthProvidersEnum } from 'src/types/enums/auth-providers';

import { AuthService } from '../auth.service';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor(
    configService: ConfigService,
    private readonly authService: AuthService,
  ) {
    super({
      clientID: configService.getOrThrow<string>('GOOGLE_CLIENT_ID'),
      clientSecret: configService.getOrThrow<string>('GOOGLE_CLIENT_SECRET'),
      callbackURL: configService.getOrThrow<string>('GOOGLE_REDIRECT_URL'),
      scope: ['email', 'profile'],
      sessionKey: 'sid',
    });
  }

  async validate(
    _accessToken: string,
    _refreshToken: string,
    profile: Profile,
    done: VerifyCallback,
  ): Promise<void> {
    const { name, emails, photos, displayName } = profile;
    if (!isArray(emails))
      throw new UnauthorizedException(
        AuthenticationMessages.GOOGLE_ACCOUNT_DOES_NOT_EXISTS,
      );
    const userData = {
      fullname: displayName,
      email: emails[0].value,
      firstname: name?.givenName,
      lastname: name?.familyName,
      picture: isArray(photos) ? photos[0].value : null,
      provider: AuthProvidersEnum.GOOGLE,
      emailVerified: true,
      password: null,
    } satisfies IProviderUser;
    const user = await this.authService.loginWithProvider(userData);
    done(null, user);
  }

  parseErrorResponse(JSONErrorResponse: string, status: number): Error {
    const { error, error_description } = JSON.parse(JSONErrorResponse);
    const errorMessage =
      error ??
      error_description ??
      AuthenticationMessages.AUTHENTICATION_FAILED;
    return new HttpException(errorMessage, status);
  }
}
