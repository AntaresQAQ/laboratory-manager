import { IsEnum, IsOptional } from 'class-validator';
import { ApparatusType } from '@/common/types';
import { ApparatusStatus } from '@/apparatus/apparatus.entity';

export class ApparatusRequestDto {
  @IsEnum(ApparatusType)
  @IsOptional()
  type?: ApparatusType;

  @IsEnum(ApparatusStatus)
  @IsOptional()
  status?: ApparatusStatus;
}
