import { Product } from '@entities/product';
import { WithPaginationMetadata } from '@interfaces/helpers/with-pagination-metadata';
import { ICreateProduct } from '@interfaces/products/create-product';
import { IGetProductsQuery } from '@interfaces/products/get-products-query';
import { IProduct } from '@interfaces/products/product';
import { IUpdateProduct } from '@interfaces/products/update-product';
import { constructMaximumOrder } from '@lib/utils/construct-maximum-order';
import {
  constructPaginationMetaData,
  constructSkip,
} from '@lib/utils/construct-pagination-metadata';
import { CategoriesService } from '@modules/categories/categories.service';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ProductsService {
  constructor(
    private readonly categoriesService: CategoriesService,
    @InjectRepository(Product)
    private readonly productsRepository: Repository<Product>,
  ) {}

  async getProducts(
    getProductsQueryDto: IGetProductsQuery,
  ): Promise<WithPaginationMetadata<IProduct[]>> {
    const { page, limit } = getProductsQueryDto;
    const [products, total] = await this.productsRepository.findAndCount({
      skip: constructSkip(page, limit),
      take: limit,
    });
    return {
      data: products,
      metadata: constructPaginationMetaData(page, limit, total),
    };
  }

  async getProduct(id: string): Promise<IProduct> {
    const product = await this.productsRepository.findOneBy({ id });
    if (!product) {
      throw new NotFoundException('Product not found');
    }
    return product;
  }

  async createProduct(createProductDto: ICreateProduct): Promise<IProduct> {
    await this.categoriesService.exists(createProductDto.categoryId);
    const product = this.productsRepository.create(createProductDto);
    product.updatedBy = createProductDto.createdBy;
    if (!createProductDto.order) {
      product.order = await constructMaximumOrder(this.productsRepository);
    }
    await this.productsRepository.insert(product);
    return product;
  }

  async updateProduct(
    id: string,
    updateProductDto: IUpdateProduct,
  ): Promise<void> {
    await this.productsRepository.update(id, updateProductDto);
  }

  async deleteProduct(id: string): Promise<void> {
    await this.productsRepository.delete(id);
  }
}
