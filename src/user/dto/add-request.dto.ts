import { IsIn, IsString } from 'class-validator';

export class AddRequestDto {
  @IsIn(['LEADER', 'WORKER'])
  readonly type: 'LEADER' | 'WORKER';

  @IsString()
  readonly username: string;

  @IsString()
  readonly password: string;
}
