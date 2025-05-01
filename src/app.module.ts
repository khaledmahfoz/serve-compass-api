import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import databaseFactoryProvider from './lib/databaseFactory';
@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync(databaseFactoryProvider),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
