import { IsString } from 'class-validator';

export class ScrapApparatusRequestDto {
  @IsString()
  reason: string;
}
