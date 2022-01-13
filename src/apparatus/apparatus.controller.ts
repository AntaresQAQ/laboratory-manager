import {
  Controller,
  Get,
  Param,
  Query,
  Redirect,
  Render,
  Post,
  Body,
} from '@nestjs/common';
import { ApparatusRequestDto } from '@/apparatus/dto/apparatus-request.dto';
import { ApparatusService } from '@/apparatus/apparatus.service';
import { OneApparatusParamsDto } from '@/apparatus/dto/one-apparatus-params.dto';
import { ErrorMessage } from '@/common/exception';
import { CurrentUser } from '@/common/user.decorator';
import { UserEntity } from '@/user/user.entity';
import { RepairApparatusRequestDto } from '@/apparatus/dto/repair-apparatus-request.dto';
import { RepairService } from '@/repair/repair.service';

@Controller('apparatus')
export class ApparatusController {
  constructor(
    private readonly apparatusService: ApparatusService,
    private readonly repairService: RepairService,
  ) {}

  @Get()
  @Render('apparatus/index.ejs')
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

  @Get(':id/repair')
  @Render('apparatus/repair')
  async apparatusRepairGet(
    @CurrentUser() currentUser: UserEntity,
    @Param() param: OneApparatusParamsDto,
  ) {
    if (!currentUser) throw new ErrorMessage(403, '请先登录');
    const id = parseInt(param.id);
    const apparatus = await this.apparatusService.findApparatusById(id);
    if (!apparatus) throw new ErrorMessage(404, '设备不存在');
    return {
      apparatus,
    };
  }

  @Post(':id/repair')
  @Redirect()
  async apparatusRepairPost(
    @CurrentUser() currentUser: UserEntity,
    @Param() param: OneApparatusParamsDto,
    @Body() body: RepairApparatusRequestDto,
  ) {
    if (!currentUser) throw new ErrorMessage(403, '请先登录');
    const id = parseInt(param.id);
    const apparatus = await this.apparatusService.findApparatusById(id);
    if (!apparatus) throw new ErrorMessage(404, '设备不存在');
    const price = parseFloat(body.price);
    if (price < 0) throw new ErrorMessage(402, '非法的价格');
    const repair = await this.repairService.createRepair(currentUser, apparatus, price);
    return { url: `/repair/${repair.id}` };
  }
}
