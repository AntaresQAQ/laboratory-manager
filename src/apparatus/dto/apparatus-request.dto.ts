import { IsEnum, IsOptional } from 'class-validator';
import { ApparatusStatus, ApparatusType } from '@/common/types';

export class ApparatusRequestDto {
  @IsEnum(ApparatusType)
  @IsOptional()
  type?: ApparatusType;

  @IsEnum(ApparatusStatus)
  @IsOptional()
  status?: ApparatusStatus;
}
