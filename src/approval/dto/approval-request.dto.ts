import { IsEnum, IsOptional } from 'class-validator';
import { ApprovalStatus } from '@/approval/approval.entity';

export class ApprovalRequestDto {
  @IsEnum(ApprovalStatus)
  @IsOptional()
  readonly status?: ApprovalStatus;
}
