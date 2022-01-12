import { ArgumentsHost, Catch, ExceptionFilter, HttpException } from '@nestjs/common';
import { Response } from 'express';

import { ErrorMessage } from './common/exception';

@Catch(ErrorMessage)
export class ErrorMessageFilter implements ExceptionFilter {
  catch(exception: ErrorMessage, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    response.status(exception.getStatus()).render('error', {
      exception,
    });
  }
}

@Catch(HttpException)
export class ErrorFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status = exception.getStatus();
    const errorResponse = exception.getResponse();
    let detail: string;
    if (errorResponse instanceof Object) {
      detail = JSON.stringify(errorResponse);
    } else {
      detail = errorResponse;
    }
    response.status(status).render('error', {
      exception: new ErrorMessage(status, exception.message, [], detail),
    });
  }
}
