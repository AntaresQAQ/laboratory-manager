import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ApprovalEntity } from '@/approval/approval.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ApprovalEntity])],
})
export class ApprovalModule {}
