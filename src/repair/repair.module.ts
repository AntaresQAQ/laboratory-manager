import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RepairEntity } from '@/repair/repair.entity';

@Module({
  imports: [TypeOrmModule.forFeature([RepairEntity])],
})
export class RepairModule {}
