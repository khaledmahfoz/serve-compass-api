import databaseFactoryProvider from '@lib/databaseFactory';
import { CategoriesModule } from '@modules/categories/categories.module';
import { ProductsModule } from '@modules/products/products.module';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync(databaseFactoryProvider),
    CategoriesModule,
    ProductsModule,
  ],
  controllers: [],
  providers: [],
})
export class MainModule {}
