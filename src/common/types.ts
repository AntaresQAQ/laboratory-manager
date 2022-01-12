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

export enum ApparatusType {
  TOOL = '工具',
  BASE = '基础',
  CONSUMABLES = '耗材',
}

export enum ApparatusStatus {
  NORMAL = '正常',
  REPAIRING = '修理中',
  SCRAPPED = '已报废',
}
