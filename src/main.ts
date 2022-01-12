import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

import { json } from 'express';
import session from 'express-session';
import Redis from 'ioredis';
import ConnectRedis from 'connect-redis';
import { ValidationPipe } from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import { ErrorFilter, ErrorMessageFilter } from './error.filter';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

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
      secret: '12345678900987654321',
      resave: false,
      saveUninitialized: false,
      store: new redisStore({
        client: new Redis('redis://127.0.0.1:6379'),
      }),
    }),
  );

  app.setBaseViewsDir(join(__dirname, '..', 'views'));
  app.setViewEngine('ejs');
  app.useStaticAssets(join(__dirname, '..', 'public'), { prefix: '/public/' });

  await app.listen(3000);
}
bootstrap().catch(err => {
  console.error(err);
});
