import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ScrapEntity } from '@/scrap/scrap.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ScrapEntity])],
})
export class ScrapModule {}
