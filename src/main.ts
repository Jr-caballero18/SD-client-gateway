import { NestFactory } from '@nestjs/core';
import { AppModule, ObserveInstrument } from './app.module.js';
import { envs } from './config/envs.js';
import { Logger, ValidationPipe } from '@nestjs/common';
import { RpcCustomExceptionFilter } from './common/index.js';

async function bootstrap() {

  const logger = new Logger('Main-Gateway');

  const app = await NestFactory.create(AppModule, {
    instrument: ObserveInstrument,
  });


  app.setGlobalPrefix('api');
  
    app.useGlobalPipes(new ValidationPipe({ whitelist: true,
    forbidNonWhitelisted: true,
  }));

  app.useGlobalFilters(new RpcCustomExceptionFilter)
  
  await app.listen(envs.port);
  logger.log(`Gateway running on port ${envs.port}`);
}
await bootstrap();
