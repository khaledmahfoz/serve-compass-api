import { Logger } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';

import { getDatabaseConfig } from './database.config';

const databaseFactory = (
  configService: ConfigService,
): TypeOrmModuleOptions => {
  const logger = new Logger('DatabaseFactory');
  return {
    ...getDatabaseConfig(configService),
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
