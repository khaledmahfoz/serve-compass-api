import { User } from '@entities/user';
import { SessionsService } from '@lib/services/sessions';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UsersController],
  providers: [UsersService, SessionsService],
  exports: [UsersService],
})
export class UsersModule {}
