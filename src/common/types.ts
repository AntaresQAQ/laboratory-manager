import { UserEntity } from '@/user/user.entity';
import { Response, Request } from 'express';

export interface ReqSession {
  uid?: number;
}

interface localsUtil {
  makeUrl: (path: string, form?: Record<string, string>) => string;
  formatDate: (date: Date, formatString: string) => string;
}

interface Locals {
  user: UserEntity;
  req: Request;
  res: Response;
  util: localsUtil;
}

export interface ResponseWithLocals extends Response {
  locals: Locals;
}

export enum ApparatusType {
  TOOL = '工具',
  BASE = '基础',
  CONSUMABLES = '耗材',
}
