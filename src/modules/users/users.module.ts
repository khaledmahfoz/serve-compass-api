import { User } from '@entities/user';
import { MediaService } from '@lib/services/media';
import { SessionsService } from '@lib/services/sessions';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UsersController],
  providers: [UsersService, SessionsService, MediaService],
  exports: [UsersService],
})
export class UsersModule {}
