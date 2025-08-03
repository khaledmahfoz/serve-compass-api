import { NestExpressApplication } from '@nestjs/platform-express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import {
  apiReference,
  NestJSReferenceConfiguration,
} from '@scalar/nestjs-api-reference';

export async function setupSwagger(app: NestExpressApplication): Promise<void> {
  const options = new DocumentBuilder()
    .setTitle('Serve compass')
    .setDescription('Resturant management service')
    .setVersion('1.0')
    .addServer('/')
    .addServer('/api')
    .build();

  const document = SwaggerModule.createDocument(app, options);

  SwaggerModule.setup('ref', app, document);

  app.use(
    '/docs',
    apiReference({
      spec: {
        content: document,
      },
      theme: 'default',
      metaData: {
        title: 'Serve Compass',
      },
      presistAuth: true,
    } satisfies NestJSReferenceConfiguration),
  );
}
