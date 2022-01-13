import { IsIn, IsString, ValidateNested } from 'class-validator';
import { IsPortNumber } from '@/common/validators';
import { Type } from 'class-transformer';

class DatabaseConfig {
  @IsIn(['mysql', 'mariadb'])
  readonly type: 'mysql' | 'mariadb';

  @IsString()
  readonly host: string;

  @IsPortNumber()
  readonly port: number;

  @IsString()
  readonly username: string;

  @IsString()
  readonly password: string;

  @IsString()
  readonly database: string;
}

export class AppConfig {
  @Type(() => DatabaseConfig)
  @ValidateNested()
  readonly database: DatabaseConfig;

  @IsString()
  readonly redis: string;

  @IsString()
  readonly sessionSecret: string;
}
