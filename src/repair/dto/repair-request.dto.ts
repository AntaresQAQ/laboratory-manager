import { IsIn, IsOptional } from 'class-validator';

export class RepairRequestDto {
  @IsIn(['0', '1'])
  @IsOptional()
  finished?: '0' | '1';
}
