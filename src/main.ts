import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { INestApplication, LogLevel, ValidationPipe } from '@nestjs/common';

import 'dotenv/config';

import { parse } from 'yaml';
import { SwaggerModule } from '@nestjs/swagger';
import { readFile } from 'fs/promises';
import { LoggingService } from './modules/logger/logging.service';
import { CustomExceptionFilter } from './modules/core/filters/custom-exception.filter';
import { LoggingInterceptor } from './modules/core/interceptors/logging-interceptor.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    bufferLogs: true,
    logger: false,
  });

  initGlobalEntities(app);
  await runSwagger(app);
  await app.listen(process.env.PORT || 4000);
}

const runSwagger = async (app: INestApplication) => {
  const file = await readFile('./doc/api.yaml', 'utf8');

  const doc = parse(file);
  SwaggerModule.setup('/doc', app, doc);
};

const initGlobalEntities = (app: INestApplication) => {
  const logger = app.get(LoggingService);
  const logLevel = +process.env.LOG_LEVEL || 4;
  logger.setLogLevels(
    ['error', 'warn', 'log', 'verbose', 'debug'].slice(
      0,
      logLevel,
    ) as LogLevel[],
  );

  onUncaughtErrors(logger);
  app.useLogger(logger);
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalInterceptors(new LoggingInterceptor(logger));
  app.useGlobalFilters(new CustomExceptionFilter(logger));
};

const onUncaughtErrors = (logger: LoggingService) => {
  process
    .on('unhandledRejection', (reason, p) => {
      logger.error(reason, 'Unhandled Rejection at Promise', p);
    })
    .on('uncaughtException', (err) => {
      logger.error(err, 'Uncaught Exception thrown');
    });
};

bootstrap().then();
