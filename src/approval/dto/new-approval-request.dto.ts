import { IsEnum, IsNumberString, IsString } from 'class-validator';
import { ApparatusType } from '@/common/types';

export class NewApprovalRequestDto {
  @IsString()
  readonly name: string;

  @IsString()
  readonly model: string;

  @IsString()
  readonly factory: string;

  @IsEnum(ApparatusType)
  readonly type: ApparatusType;

  @IsNumberString()
  readonly price: string;

  @IsNumberString()
  readonly amount: string;
}
