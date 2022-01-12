import { UserEntity } from '@/user/user.entity';
import { Response, Request } from 'express';

export interface ReqSession {
  uid?: number;
}

interface Locals {
  user: UserEntity;
  req: Request;
  res: Response;
}

export interface ResponseWithLocals extends Response {
  locals: Locals;
}
