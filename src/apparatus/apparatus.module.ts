import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ApparatusEntity } from '@/apparatus/apparatus.entity';
import { ApparatusService } from './apparatus.service';
import { ApparatusController } from './apparatus.controller';

@Module({
  imports: [TypeOrmModule.forFeature([ApparatusEntity])],
  providers: [ApparatusService],
  controllers: [ApparatusController],
})
export class ApparatusModule {}
