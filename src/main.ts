import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

import { json } from 'express';
import session from 'express-session';
import Redis from 'ioredis';
import ConnectRedis from 'connect-redis';
import { Logger, ValidationPipe } from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import { ErrorFilter, ErrorMessageFilter } from './error.filter';
import { ConfigService } from '@/config/config.service';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  const configService = app.get(ConfigService);

  app.use(json({ limit: '1024mb' }));

  app.useGlobalFilters(app.get(ErrorFilter), app.get(ErrorMessageFilter));
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );
  app.use(json({ limit: '1024mb' }));

  const redisStore = ConnectRedis(session);
  app.use(
    session({
      secret: configService.config.sessionSecret,
      resave: false,
      saveUninitialized: false,
      store: new redisStore({
        client: new Redis(configService.config.redis),
      }),
    }),
  );

  app.setBaseViewsDir(join(__dirname, '..', 'views'));
  app.setViewEngine('ejs');

  await app.listen(
    configService.config.server.port,
    configService.config.server.hostname,
  );
  Logger.log(
    `App is listening on ${configService.config.server.hostname}:${configService.config.server.port}`,
    'Bootstrap',
  );
}
bootstrap().catch(err => {
  console.error(err);
});
