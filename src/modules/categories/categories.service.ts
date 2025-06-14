import { Category } from '@entities/category';
import { ICategory } from '@interfaces/categories/category';
import { ICreateCategory } from '@interfaces/categories/create-category';
import { IGetCategoriesQuery } from '@interfaces/categories/get-categories-query';
import { WithPaginationMetadata } from '@interfaces/helpers/with-pagination-metadata';
import {
  constructPaginationMetaData,
  constructSkip,
} from '@lib/utils/construct-pagination-metadata';
import { UpdateCategoryDto } from '@modules/categories/dtos/update-category.dto';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category)
    private readonly categoriesRepository: Repository<Category>,
  ) {}

  async getCategories(
    getCategoriesQueryDto: IGetCategoriesQuery,
  ): Promise<WithPaginationMetadata<ICategory[]>> {
    const { page, limit } = getCategoriesQueryDto;
    const [categories, total] = await this.categoriesRepository.findAndCount({
      skip: constructSkip(page, limit),
      take: limit,
    });
    return {
      data: categories,
      metadata: constructPaginationMetaData(page, limit, total),
    };
  }

  async getCategory(id: string): Promise<ICategory> {
    const category = await this.categoriesRepository.findOneBy({ id });
    if (!category) {
      throw new NotFoundException('Category not found');
    }
    return category;
  }

  async createCategory(createCategoryDto: ICreateCategory): Promise<ICategory> {
    const category = this.categoriesRepository.create(createCategoryDto);
    category.updatedBy = createCategoryDto.createdBy;
    if (!createCategoryDto.order) {
      const latestOrder = await this.categoriesRepository.maximum('order');
      category.order = latestOrder ? latestOrder + 1 : 0;
    }
    await this.categoriesRepository.insert(category);
    return category;
  }

  async updateCategory(
    id: string,
    updateCategoryDto: UpdateCategoryDto,
  ): Promise<void> {
    await this.categoriesRepository.update(id, updateCategoryDto);
  }

  async deleteCategory(id: string): Promise<void> {
    await this.categoriesRepository.delete(id);
  }

  async exists(
    id: string,
    { noThrow = false }: { noThrow?: boolean } = {},
  ): Promise<boolean> {
    const category = await this.categoriesRepository.exists({
      where: { id },
    });
    if (!noThrow && !category) {
      throw new NotFoundException('Category not found');
    }
    return !!category;
  }
}
