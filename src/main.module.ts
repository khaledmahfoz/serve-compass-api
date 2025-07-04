import databaseFactoryProvider from '@lib/database/database.provider';
import { RedisOptionsProvider } from '@lib/providers/redis-options';
import { AuthModule } from '@modules/auth/auth.module';
import { CategoriesModule } from '@modules/categories/categories.module';
import { ProductsModule } from '@modules/products/products.module';
import { RolesModule } from '@modules/roles/roles.module';
import { RolesManagementModule } from '@modules/roles-management/roles-management.module';
import { UsersModule } from '@modules/users/users.module';
import { CacheModule } from '@nestjs/cache-manager';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync(databaseFactoryProvider),
    CacheModule.registerAsync(RedisOptionsProvider),
    AuthModule,
    UsersModule,
    RolesModule,
    RolesManagementModule,
    CategoriesModule,
    ProductsModule,
  ],
  controllers: [],
  providers: [],
})
export class MainModule {}
