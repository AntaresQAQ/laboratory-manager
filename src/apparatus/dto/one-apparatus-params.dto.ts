import { IsIntString } from '@/common/validators';

export class OneApparatusParamsDto {
  @IsIntString({ message: 'id must be a integer' })
  id: string;
}
