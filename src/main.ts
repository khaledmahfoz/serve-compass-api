import swagger, { SwaggerOptions } from '@fastify/swagger';
import { UniqueConstraintFilter } from '@lib/filters/conflict-exception';
import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import fastifyScalar, {
  FastifyApiReferenceOptions,
} from '@scalar/fastify-api-reference';

import { MainModule } from './main.module';
async function bootstrap(): Promise<void> {
  const app = await NestFactory.create<NestFastifyApplication>(
    MainModule,
    new FastifyAdapter({ logger: true }),
  );

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );

  app.useGlobalFilters(new UniqueConstraintFilter());

  const options = new DocumentBuilder()
    .setTitle('Serve compass')
    .setDescription('Resturant management service')
    .setVersion('1.0')
    .addServer('/')
    .addServer('/api')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  await app.register(swagger, {
    openapi: document,
  } as SwaggerOptions);
  await app.register(fastifyScalar, {
    routePrefix: '/docs',
    configuration: {
      theme: 'default',
      content: document,
    },
  } as FastifyApiReferenceOptions);

  await app.listen(process.env.PORT ?? 3000);
}

bootstrap();
