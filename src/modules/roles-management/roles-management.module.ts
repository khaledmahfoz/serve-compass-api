import { UserRole } from '@entities/user-role';
import { SessionsService } from '@lib/services/sessions';
import { RolesModule } from '@modules/roles/roles.module';
import { UsersModule } from '@modules/users/users.module';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { RolesManagementController } from './roles-management.controller';
import { RolesManagementService } from './roles-management.service';

@Module({
  imports: [TypeOrmModule.forFeature([UserRole]), UsersModule, RolesModule],
  controllers: [RolesManagementController],
  providers: [RolesManagementService, SessionsService],
  exports: [RolesManagementService],
})
export class RolesManagementModule {}
