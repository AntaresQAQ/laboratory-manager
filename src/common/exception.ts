import { HttpException } from '@nestjs/common';

interface NextUrl {
  readonly text: string;
  readonly url: string;
}

export class ErrorMessage extends HttpException {
  constructor(
    status: number,
    readonly message: string,
    readonly nextUrls: NextUrl[] = [],
    readonly details?: string,
  ) {
    super(
      {
        status,
        error: message,
      },
      status,
    );
  }
}
