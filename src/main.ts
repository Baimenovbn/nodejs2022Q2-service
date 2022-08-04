import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { INestApplication, ValidationPipe } from '@nestjs/common';

import 'dotenv/config';

import { parse } from 'yaml';
import { SwaggerModule } from '@nestjs/swagger';
import { readFile } from 'fs/promises';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  await runSwagger(app);
  await app.listen(process.env.PORT || 4000);
}

const runSwagger = async (app: INestApplication) => {
  const file = await readFile('./doc/api.yaml', 'utf8');

  const doc = parse(file);
  SwaggerModule.setup('/doc', app, doc);
};

bootstrap().then();
