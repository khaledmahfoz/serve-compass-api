import { Category } from '@entities/category';
import { Product } from '@entities/product';
import { MediaService } from '@lib/services/media';
import { CategoriesController } from '@modules/categories/categories.controller';
import { CategoriesService } from '@modules/categories/categories.service';
import { RolesManagementModule } from '@modules/roles-management/roles-management.module';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forFeature([Product, Category]),
    RolesManagementModule,
  ],
  controllers: [CategoriesController],
  providers: [CategoriesService, MediaService],
  exports: [CategoriesService],
})
export class CategoriesModule {}
