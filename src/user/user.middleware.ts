import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request } from 'express';

import { UserService } from './user.service';
import { ReqSession, ResponseWithLocals } from '@/common/types';

@Injectable()
export class UserMiddleware implements NestMiddleware {
  constructor(private readonly userService: UserService) {}
  async use(req: Request, res: ResponseWithLocals, next: () => void): Promise<void> {
    const session = req.session as ReqSession;
    if (!session.uid) {
      res.locals.user = null;
    } else {
      res.locals.user = await this.userService.findUserById(session.uid);
    }
    next();
  }
}
