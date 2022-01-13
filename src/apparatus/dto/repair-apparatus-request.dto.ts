import { IsNumberString } from 'class-validator';

export class RepairApparatusRequestDto {
  @IsNumberString()
  price: string;
}
