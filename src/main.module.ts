import databaseFactoryProvider from '@lib/database/database.provider';
import { RolesInterceptor } from '@lib/interceptors/roles-serializer';
import { BullOptionsProvider } from '@lib/providers/bull-options';
import { MailerOptionsProvider } from '@lib/providers/mailer-options';
import { RedisOptionsProvider } from '@lib/providers/redis-options';
import { AuthModule } from '@modules/auth/auth.module';
import { CategoriesModule } from '@modules/categories/categories.module';
import { ProductsModule } from '@modules/products/products.module';
import { RolesModule } from '@modules/roles/roles.module';
import { RolesManagementModule } from '@modules/roles-management/roles-management.module';
import { UsersModule } from '@modules/users/users.module';
import { BullModule } from '@nestjs/bullmq';
import { CacheModule } from '@nestjs/cache-manager';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MailerModule } from '@nestjs-modules/mailer';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync(databaseFactoryProvider),
    CacheModule.registerAsync(RedisOptionsProvider),
    MailerModule.forRootAsync(MailerOptionsProvider),
    BullModule.forRootAsync(BullOptionsProvider),
    AuthModule,
    UsersModule,
    RolesModule,
    RolesManagementModule,
    CategoriesModule,
    ProductsModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: RolesInterceptor,
    },
  ],
})
export class MainModule {}
