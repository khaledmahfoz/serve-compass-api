import { Category } from '@entities/category';
import { Product } from '@entities/product';
import { MediaService } from '@lib/services/media';
import { CategoriesModule } from '@modules/categories/categories.module';
import { RolesManagementModule } from '@modules/roles-management/roles-management.module';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Product, Category]),
    CategoriesModule,
    RolesManagementModule,
  ],
  controllers: [ProductsController],
  providers: [ProductsService, MediaService],
  exports: [ProductsService],
})
export class ProductsModule {}
