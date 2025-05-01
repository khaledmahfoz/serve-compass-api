import { Logger } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';

const databaseFactory = (
  configService: ConfigService,
): TypeOrmModuleOptions => {
  const logger = new Logger('DatabaseFactory');
  const isProduction = process.env.NODE_ENV === 'production';
  const type = configService.getOrThrow<'postgres'>('DATABASE_TYPE');
  const host = configService.getOrThrow<string>('DATABASE_HOST');
  const port = configService.getOrThrow<number>('DATABASE_PORT');
  const dbName = configService.getOrThrow<string>('DATABASE_NAME');
  const username = configService.getOrThrow<string>('DATABASE_USER_NAME');
  const password = configService.getOrThrow<string>('DATABASE_PASSWORD');

  return {
    type,
    host,
    port,
    username,
    password,
    database: dbName,
    autoLoadEntities: true,
    synchronize: !isProduction,
    poolErrorHandler: (err: any) => {
      logger.error('Database pool error:', err);
    },
  };
};

const databaseFactoryProvider = {
  imports: [ConfigModule],
  inject: [ConfigService],
  useFactory: databaseFactory,
};

export default databaseFactoryProvider;
