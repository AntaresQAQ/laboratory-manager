import { Controller, Get, Param, Query, Render } from '@nestjs/common';
import { ApparatusRequestDto } from '@/apparatus/dto/apparatus-request.dto';
import { ApparatusService } from '@/apparatus/apparatus.service';
import { ApparatusOneParamsDto } from '@/apparatus/dto/apparatus-one-params.dto';

@Controller('apparatus')
export class ApparatusController {
  constructor(private readonly apparatusService: ApparatusService) {}

  @Get()
  @Render('apparatus/index')
  async apparatusGet(@Query() query: ApparatusRequestDto) {
    const apparatus = await this.apparatusService.findApparatusByTypeAndStatus(
      query.type,
      query.status,
    );
    return {
      apparatus,
    };
  }

  @Get(':id')
  @Render('')
  async apparatusOneGet(@Param() params: ApparatusOneParamsDto) {}
}
