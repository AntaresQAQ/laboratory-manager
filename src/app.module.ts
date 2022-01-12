import {
  forwardRef,
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { UserModule } from './user/user.module';
import { AppMiddleware } from '@/app.middleware';
import { ErrorFilter, ErrorMessageFilter } from './error.filter';
import { ApparatusModule } from './apparatus/apparatus.module';

@Module({
  imports: [
    forwardRef(() => DatabaseModule),
    forwardRef(() => UserModule),
    forwardRef(() => ApparatusModule),
  ],
  controllers: [AppController],
  providers: [AppService, ErrorFilter, ErrorMessageFilter],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): void {
    consumer.apply(AppMiddleware).forRoutes({
      path: '*',
      method: RequestMethod.ALL,
    });
  }
}
