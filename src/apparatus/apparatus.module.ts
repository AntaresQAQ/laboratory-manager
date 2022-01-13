import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ApparatusEntity } from '@/apparatus/apparatus.entity';
import { ApparatusService } from './apparatus.service';
import { ApparatusController } from './apparatus.controller';
import { RepairModule } from '@/repair/repair.module';

@Module({
  imports: [TypeOrmModule.forFeature([ApparatusEntity]), forwardRef(() => RepairModule)],
  providers: [ApparatusService],
  controllers: [ApparatusController],
  exports: [ApparatusService],
})
export class ApparatusModule {}
