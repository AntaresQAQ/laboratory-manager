import { Injectable, NestMiddleware } from '@nestjs/common';
import { ResponseWithLocals } from '@/common/types';
import { Request } from 'express';
import { encode } from 'querystring';
import moment from 'moment';

@Injectable()
export class AppMiddleware implements NestMiddleware {
  use(req: Request, res: ResponseWithLocals, next: () => void): any {
    res.locals.req = req;
    res.locals.res = res;
    res.locals.util = {
      makeUrl(path, query?) {
        for (const key in query) {
          if (query[key] === undefined) delete query[key];
        }
        const encoded = encode(query);
        if (encoded) path += '?' + encoded;
        return path;
      },
      formatDate(date, formatString) {
        return moment(date).format(formatString);
      },
    };
    next();
  }
}
