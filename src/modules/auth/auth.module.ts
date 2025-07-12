import { AuthController } from '@auth/auth.controller';
import { AuthService } from '@auth/auth.service';
import { EmailProcessor } from '@lib/processors/email';
import { SessionsService } from '@lib/services/sessions';
import { GoogleStrategy } from '@modules/auth/strategies/google';
import { UsersModule } from '@modules/users/users.module';
import { BullModule } from '@nestjs/bullmq';
import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';

import { SessionSerializer } from './serializers/session';
import { LocalStrategy } from './strategies/local';

@Module({
  imports: [
    PassportModule.register({ session: true }),
    UsersModule,
    BullModule.registerQueue({ name: 'emailQueue' }),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    GoogleStrategy,
    LocalStrategy,
    SessionSerializer,
    EmailProcessor,
    SessionsService,
  ],
})
export class AuthModule {}
