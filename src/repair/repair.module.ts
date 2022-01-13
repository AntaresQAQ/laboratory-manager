import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RepairEntity } from '@/repair/repair.entity';
import { RepairController } from './repair.controller';
import { RepairService } from './repair.service';

@Module({
  imports: [TypeOrmModule.forFeature([RepairEntity])],
  controllers: [RepairController],
  providers: [RepairService],
  exports: [RepairService],
})
export class RepairModule {}
