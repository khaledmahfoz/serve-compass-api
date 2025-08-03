import { UniqueConstraintFilter } from '@lib/filters/conflict-exception';
import { setupSessions } from '@lib/utils/setup-sessions';
import { setupSwagger } from '@lib/utils/setup-swagger';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import * as cookieParser from 'cookie-parser';
import * as passport from 'passport';

import { MainModule } from './main.module';

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create<NestExpressApplication>(MainModule);

  app.enableCors({ origin: '*', credentials: true });

  app.use(cookieParser());

  await setupSessions(app);

  app.use(passport.initialize());
  app.use(passport.session());

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );

  app.useGlobalFilters(new UniqueConstraintFilter());

  await setupSwagger(app);

  const configService = app.get(ConfigService);

  await app.listen(configService.getOrThrow<number>('PORT'));
}

bootstrap();
