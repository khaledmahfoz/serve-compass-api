import { CacheModuleAsyncOptions } from '@nestjs/cache-manager';
import { InternalServerErrorException, Logger } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { redisStore } from 'cache-manager-redis-store';

export const RedisOptionsProvider: CacheModuleAsyncOptions = {
  isGlobal: true,
  imports: [ConfigModule],
  useFactory: async (configService: ConfigService) => {
    const logger = new Logger('RedisOptionsProvider');
    try {
      const store = await redisStore({
        socket: {
          host: configService.get<string>('REDIS_HOST'),
          port: parseInt(configService.get<string>('REDIS_PORT')!),
        },
        password: configService.get('REDIS_PASSWORD'),
        username: configService.get('REDIS_USERNAME'),
      });
      logger.log('Redis connection was successful');
      return {
        store: () => store,
      };
    } catch (error) {
      logger.error(`Redis connection error: ${error}`);
      throw new InternalServerErrorException('Redis connection error');
    }
  },
  inject: [ConfigService],
};
