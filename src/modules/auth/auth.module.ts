import { AuthController } from '@auth/auth.controller';
import { AuthService } from '@auth/auth.service';
import { GoogleStrategy } from '@modules/auth/strategies/google';
import { UsersModule } from '@modules/users/users.module';
import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';

import { SessionSerializer } from './serializers/session';
import { LocalStrategy } from './strategies/local';

@Module({
  imports: [PassportModule.register({ session: true }), UsersModule],
  controllers: [AuthController],
  providers: [AuthService, GoogleStrategy, LocalStrategy, SessionSerializer],
})
export class AuthModule {}
