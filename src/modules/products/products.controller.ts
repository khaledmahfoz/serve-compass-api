import { RolesTypeEnum } from '@enums/roles-type';
import { WithPaginationMetadata } from '@interfaces/helpers/with-pagination-metadata';
import { IProduct } from '@interfaces/products/product';
import { Roles } from '@lib/decorators/roles';
import { RolesGuard } from '@lib/guards/roles';
import { createImageUploadOptions } from '@lib/utils/image-upload-options';
import {
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  Query,
  Res,
  Body,
  Delete,
  Patch,
  HttpCode,
  HttpStatus,
  UseGuards,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Response } from 'express';

import { CreateProductDocs } from './docs/create-product';
import { DeleteProductDocs } from './docs/delete-product';
import { DeleteProductImageDocs } from './docs/delete-product-image';
import { GetProductDocs } from './docs/get-product';
import { GetProductsDocs } from './docs/get-products';
import { ProductsDocs } from './docs/products';
import { UpdateProductDocs } from './docs/update-product';
import { UploadProductImageDocs } from './docs/upload-product-image';
import { CreateProductDto } from './dtos/create-product.dto';
import { GetProductsQueryDto } from './dtos/get-products-query.dto';
import { UpdateProductDto } from './dtos/update-product.dto';
import { ProductsService } from './products.service';

@ProductsDocs()
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  @GetProductsDocs()
  getProducts(
    @Query() query: GetProductsQueryDto,
  ): Promise<WithPaginationMetadata<IProduct[]>> {
    return this.productsService.getProducts(query);
  }

  @Get(':id')
  @GetProductDocs()
  getProduct(@Param('id', ParseUUIDPipe) id: string): Promise<IProduct> {
    return this.productsService.getProduct(id);
  }

  @UseGuards(RolesGuard)
  @Roles(RolesTypeEnum.ADMIN, RolesTypeEnum.MODERATOR)
  @Post()
  @CreateProductDocs()
  async createProduct(
    @Res({ passthrough: true }) res: Response,
    @Body() createProductDto: CreateProductDto,
  ): Promise<void> {
    const product = await this.productsService.createProduct(createProductDto);
    res.header('Location', `/products/${product.id}`);
  }

  @UseGuards(RolesGuard)
  @Roles(RolesTypeEnum.ADMIN, RolesTypeEnum.MODERATOR)
  @HttpCode(HttpStatus.NO_CONTENT)
  @Patch(':id')
  @UpdateProductDocs()
  async updateProduct(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateProductDto: UpdateProductDto,
  ): Promise<void> {
    if (!updateProductDto) return;
    await this.productsService.updateProduct(id, updateProductDto);
  }

  @UseGuards(RolesGuard)
  @Roles(RolesTypeEnum.ADMIN, RolesTypeEnum.MODERATOR)
  @Delete(':id')
  @DeleteProductDocs()
  deleteProduct(@Param('id', ParseUUIDPipe) id: string): Promise<void> {
    return this.productsService.deleteProduct(id);
  }

  @UseGuards(RolesGuard)
  @Roles(RolesTypeEnum.ADMIN, RolesTypeEnum.MODERATOR)
  @UploadProductImageDocs()
  @Post(':id/image')
  @UseInterceptors(FileInterceptor('image'))
  async uploadProductImage(
    @Param('id', ParseUUIDPipe) id: string,
    @UploadedFile(createImageUploadOptions())
    image: Express.Multer.File,
  ): Promise<void> {
    return this.productsService.uploadProductImage(id, image);
  }

  @UseGuards(RolesGuard)
  @Roles(RolesTypeEnum.ADMIN, RolesTypeEnum.MODERATOR)
  @Delete(':id/image')
  @DeleteProductImageDocs()
  async deleteProductImage(
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<void> {
    return this.productsService.deleteProductImage(id);
  }
}
