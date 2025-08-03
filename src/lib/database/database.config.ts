import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const getDatabaseConfig = (
  configService: ConfigService,
): TypeOrmModuleOptions => {
  const isProduction =
    configService.getOrThrow<string>('NODE_ENV') === 'production';
  return {
    type: configService.getOrThrow<'postgres'>('DATABASE_TYPE'),
    host: configService.getOrThrow<string>('DATABASE_HOST'),
    port: configService.getOrThrow<number>('DATABASE_PORT'),
    username: configService.getOrThrow<string>('DATABASE_USER_NAME'),
    password: configService.getOrThrow<string>('DATABASE_PASSWORD'),
    database: configService.getOrThrow<string>('DATABASE_NAME'),
    autoLoadEntities: true,
    synchronize: !isProduction,
    logging: false,
    migrationsRun: false,
  };
};
