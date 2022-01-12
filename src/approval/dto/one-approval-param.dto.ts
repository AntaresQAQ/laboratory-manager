import { IsIntString } from '@/common/validators';
import { IsEnum } from 'class-validator';

export class OneApprovalParamDto {
  @IsIntString({ message: 'id must be a integer' })
  id: string;
}
