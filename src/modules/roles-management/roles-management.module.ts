import { UserRole } from '@entities/user-role';
import { RolesGuard } from '@lib/guards/roles';
import { EmailProcessor } from '@lib/processors/email';
import { SessionsService } from '@lib/services/sessions';
import { TokensService } from '@lib/services/tokens';
import { RolesModule } from '@modules/roles/roles.module';
import { UsersModule } from '@modules/users/users.module';
import { BullModule } from '@nestjs/bullmq';
import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { RolesManagementController } from './roles-management.controller';
import { RolesManagementService } from './roles-management.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserRole]),
    UsersModule,
    forwardRef(() => RolesModule),
    BullModule.registerQueue({ name: 'emailQueue' }),
  ],
  controllers: [RolesManagementController],
  providers: [
    RolesManagementService,
    SessionsService,
    TokensService,
    EmailProcessor,
    RolesGuard,
  ],
  exports: [RolesManagementService, RolesGuard],
})
export class RolesManagementModule {}
