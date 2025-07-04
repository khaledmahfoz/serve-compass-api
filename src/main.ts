import { UniqueConstraintFilter } from '@lib/filters/conflict-exception';
import { RolesInterceptor } from '@lib/interceptors/roles-serializer';
import { setupSessions } from '@lib/utils/setup-sessions';
import { setupSwagger } from '@lib/utils/setup-swagger';
import { ValidationPipe } from '@nestjs/common';
import { NestFactory, Reflector } from '@nestjs/core';
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

  app.useGlobalInterceptors(new RolesInterceptor(app.get(Reflector)));

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );

  app.useGlobalFilters(new UniqueConstraintFilter());

  await setupSwagger(app);

  await app.listen(process.env.PORT ?? 3000);
}

bootstrap();
