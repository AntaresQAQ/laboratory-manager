import { IsIntString } from '@/common/validators';

export class OneRepairParamsDto {
  @IsIntString({ message: 'id must be a integer' })
  id: string;
}
