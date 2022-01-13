import { Controller, Get, Param, Query, Render } from '@nestjs/common';
import { RepairService } from '@/repair/repair.service';
import { OneRepairParamsDto } from '@/repair/dto/one-repair-params.dto';
import { ErrorMessage } from '@/common/exception';
import { RepairRequestDto } from '@/repair/dto/repair-request.dto';

@Controller('repair')
export class RepairController {
  constructor(private readonly repairService: RepairService) {}

  @Get()
  @Render('repair/index')
  async repairGet(@Query() query: RepairRequestDto) {
    let finished: boolean;
    if (query.finished) {
      finished = !!parseInt(query.finished);
    }
    const repairs = await this.repairService.findRepairs(finished);
    const names: string[] = [];
    const usernames: string[] = [];
    for (const repair of repairs) {
      names.push((await repair.apparatus).name);
      usernames.push((await repair.person).username);
    }
    return { repairs, names, usernames };
  }

  @Get(':id')
  @Render('repair/one')
  async repairOneGet(@Param() param: OneRepairParamsDto) {
    const id = parseInt(param.id);
    const repair = await this.repairService.findRepairById(id);
    if (!repair) throw new ErrorMessage(404, '维修记录不存在');
    return {
      repair,
      person: await repair.person,
      apparatus: await repair.apparatus,
    };
  }
}
