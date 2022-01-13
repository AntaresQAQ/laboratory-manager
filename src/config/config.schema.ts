import { IsBoolean, IsIn, IsIP, IsString, ValidateNested } from 'class-validator';
import { IsPortNumber } from '@/common/validators';
import { Type } from 'class-transformer';

class ServerConfig {
  @IsIP()
  readonly hostname: string;

  @IsPortNumber()
  readonly port: string;
}

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

  @IsBoolean()
  readonly logging: boolean;
}

export class AppConfig {
  @Type(() => ServerConfig)
  @ValidateNested()
  readonly server: ServerConfig;

  @Type(() => DatabaseConfig)
  @ValidateNested()
  readonly database: DatabaseConfig;

  @IsString()
  readonly redis: string;

  @IsString()
  readonly sessionSecret: string;
}
