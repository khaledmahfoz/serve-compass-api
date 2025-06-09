import { ICategory } from '@interfaces/categories/category';
import { WithPaginationMetadata } from '@interfaces/helpers/with-pagination-metadata';
import { CategoriesService } from '@modules/categories/categories.service';
import { CreateCategoryDto } from '@modules/categories/dtos/create-category.dto';
import { UpdateCategoryDto } from '@modules/categories/dtos/update-category.dto';
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseUUIDPipe,
  Query,
  Res,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { FastifyReply } from 'fastify';

import { CategoriesDocs } from './docs/categories';
import { CreateCategoryDocs } from './docs/create-category';
import { DeleteCategoryDocs } from './docs/delete-category';
import { GetCategoriesDocs } from './docs/get-categories';
import { GetCategoryDocs } from './docs/get-category';
import { UpdateCategoryDocs } from './docs/update-category';
import { GetCategoriesQueryDto } from './dtos/get-categories-query.dto';

@CategoriesDocs()
@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Get()
  @GetCategoriesDocs()
  getCategories(
    @Query() query: GetCategoriesQueryDto,
  ): Promise<WithPaginationMetadata<ICategory[]>> {
    return this.categoriesService.getCategories(query);
  }

  @Get(':id')
  @GetCategoryDocs()
  getCategory(@Param('id', ParseUUIDPipe) id: string): Promise<ICategory> {
    return this.categoriesService.getCategory(id);
  }

  @Post()
  @CreateCategoryDocs()
  async createCategory(
    @Res({ passthrough: true }) res: FastifyReply,
    @Body() createCategoryDto: CreateCategoryDto,
  ): Promise<void> {
    const category =
      await this.categoriesService.createCategory(createCategoryDto);
    res.header('Location', `/categories/${category.id}`);
    res.send();
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Patch(':id')
  @UpdateCategoryDocs()
  async updateCategory(
    @Res({ passthrough: true }) res: FastifyReply,
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateCategoryDto: UpdateCategoryDto,
  ): Promise<void> {
    if (!updateCategoryDto) return;
    await this.categoriesService.updateCategory(id, updateCategoryDto);
  }

  @Delete(':id')
  @DeleteCategoryDocs()
  deleteCategory(@Param('id', ParseUUIDPipe) id: string): Promise<void> {
    return this.categoriesService.deleteCategory(id);
  }
}
