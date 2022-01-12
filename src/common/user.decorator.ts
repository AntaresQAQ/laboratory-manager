import { createParamDecorator, ExecutionContext } from '@nestjs/common';

import { ResponseWithLocals } from './types';

/**
 * See auth/auth.middleware.ts for request.session
 */
export const CurrentUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const response: ResponseWithLocals = ctx.switchToHttp().getResponse();
    return response.locals.user;
  },
);
