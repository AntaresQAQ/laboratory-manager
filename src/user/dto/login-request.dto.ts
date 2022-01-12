import { IsString } from 'class-validator';

export class LoginRequestDto {
  @IsString()
  readonly username: string;

  @IsString()
  readonly password: string;
}
