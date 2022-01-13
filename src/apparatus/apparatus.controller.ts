import { Controller, Get, Param, Query, Render } from '@nestjs/common';
import { ApparatusRequestDto } from '@/apparatus/dto/apparatus-request.dto';
import { ApparatusService } from '@/apparatus/apparatus.service';
import { OneApparatusParamsDto } from '@/apparatus/dto/one-apparatus-params.dto';
import { ErrorMessage } from '@/common/exception';
import { CurrentUser } from '@/common/user.decorator';
import { UserEntity } from '@/user/user.entity';

@Controller('apparatus')
export class ApparatusController {
  constructor(private readonly apparatusService: ApparatusService) {}

  @Get()
  @Render('apparatus/index')
  async apparatusGet(@Query() query: ApparatusRequestDto) {
    const apparatuses = await this.apparatusService.findApparatusByTypeAndStatus(
      query.type,
      query.status,
    );
    return {
      apparatuses,
    };
  }

  @Get(':id')
  @Render('apparatus/one')
  async apparatusOneGet(
    @CurrentUser() currentUser: UserEntity,
    @Param() param: OneApparatusParamsDto,
  ) {
    if (!currentUser) throw new ErrorMessage(403, '请先登录');
    const id = parseInt(param.id);
    const apparatus = await this.apparatusService.findApparatusById(id);
    if (!apparatus) throw new ErrorMessage(404, '设备不存在');
    return {
      apparatus,
      person: await apparatus.person,
    };
  }
}
