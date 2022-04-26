/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { NestFactory } from '@nestjs/core';
import { INestApplication, Logger, ValidationPipe } from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app/app.module';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const cookieSession = require('cookie-session');

function setupSwagger(app: INestApplication): void {
  const config = new DocumentBuilder()
    .setTitle('Learning Testing 2022')
    .setDescription('Jeera bugtracker app')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
}

async function bootstrap() {
  const isProd = process.env.NODE_ENV === 'prod';

  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.enableCors({
    origin: ['http://localhost:4200', 'https://wdudek82.github.io'],
    methods: ['GET', 'HEAD', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    credentials: true,
  });
  app.set('trust proxy', 1);
  app.use(
    cookieSession({
      keys: ['key1'],
      sameSite: isProd ? 'none' : 'lax',
      secure: isProd,
    }),
  );
  app.useGlobalPipes(
    new ValidationPipe({
      forbidNonWhitelisted: true,
    }),
  );

  setupSwagger(app);
  app.setGlobalPrefix('api');

  const port = process.env.PORT || 8080;
  await app.listen(port);
  Logger.log(
    `🚀 Application is running on: http://localhost:${port}/api`
  );
}

bootstrap();
