import { TodoModule } from '@modules/todo/todo.module';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import databaseFactoryProvider from './lib/databaseFactory';
@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync(databaseFactoryProvider),
    TodoModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
