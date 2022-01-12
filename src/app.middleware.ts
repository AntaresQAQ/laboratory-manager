import { Injectable, NestMiddleware } from '@nestjs/common';
import { ResponseWithLocals } from '@/common/types';
import { Request } from 'express';

@Injectable()
export class AppMiddleware implements NestMiddleware {
  use(req: Request, res: ResponseWithLocals, next: () => void): any {
    res.locals.req = req;
    res.locals.res = res;
    next();
  }
}
