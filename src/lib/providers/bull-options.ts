import { SharedBullAsyncConfiguration } from '@nestjs/bullmq';
import { ConfigModule, ConfigService } from '@nestjs/config';

export const BullOptionsProvider: SharedBullAsyncConfiguration = {
  imports: [ConfigModule],
  useFactory: (configService: ConfigService) => ({
    connection: {
      host: configService.getOrThrow<string>('REDIS_HOST'),
      port: configService.getOrThrow<number>('REDIS_PORT'),
      password: configService.getOrThrow<string>('REDIS_PASSWORD'),
    },
  }),
  inject: [ConfigService],
};
