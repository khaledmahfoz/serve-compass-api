import { RolesTypeEnum } from '@enums/roles-type';
import { ICategory } from '@interfaces/categories/category';
import { WithPaginationMetadata } from '@interfaces/helpers/with-pagination-metadata';
import { Roles } from '@lib/decorators/roles';
import { RolesGuard } from '@lib/guards/roles';
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
  UseGuards,
} from '@nestjs/common';
import { Response } from 'express';

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

  @UseGuards(RolesGuard)
  @Roles(RolesTypeEnum.ADMIN, RolesTypeEnum.MODERATOR)
  @Post()
  @CreateCategoryDocs()
  async createCategory(
    @Res({ passthrough: true }) res: Response,
    @Body() createCategoryDto: CreateCategoryDto,
  ): Promise<void> {
    const category =
      await this.categoriesService.createCategory(createCategoryDto);
    res.header('Location', `/categories/${category.id}`);
  }

  @UseGuards(RolesGuard)
  @Roles(RolesTypeEnum.ADMIN, RolesTypeEnum.MODERATOR)
  @HttpCode(HttpStatus.NO_CONTENT)
  @Patch(':id')
  @UpdateCategoryDocs()
  async updateCategory(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateCategoryDto: UpdateCategoryDto,
  ): Promise<void> {
    if (!updateCategoryDto) return;
    await this.categoriesService.updateCategory(id, updateCategoryDto);
  }

  @UseGuards(RolesGuard)
  @Roles(RolesTypeEnum.ADMIN, RolesTypeEnum.MODERATOR)
  @Delete(':id')
  @DeleteCategoryDocs()
  deleteCategory(@Param('id', ParseUUIDPipe) id: string): Promise<void> {
    return this.categoriesService.deleteCategory(id);
  }
}
