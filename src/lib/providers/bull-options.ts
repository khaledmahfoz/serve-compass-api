import { SharedBullAsyncConfiguration } from '@nestjs/bullmq';
import { ConfigModule, ConfigService } from '@nestjs/config';

export const BullOptionsProvider: SharedBullAsyncConfiguration = {
  imports: [ConfigModule],
  useFactory: (configService: ConfigService) => {
    return {
      connection: {
        host: configService.getOrThrow<string>('REDIS_HOST'),
        port: configService.getOrThrow<number>('REDIS_PORT'),
        password: configService.getOrThrow<string>('REDIS_PASSWORD'),
        retryDelayOnFailover: 100,
        enableReadyCheck: false,
        retryStrategy: (times) => {
          return Math.min(times * 1000, 10000);
        },
      },
      defaultJobOptions: {
        removeOnComplete: true,
        removeOnFail: false,
        attempts: 5,
        backoff: {
          type: 'exponential',
          delay: 1000,
        },
      },
    };
  },
  inject: [ConfigService],
};
