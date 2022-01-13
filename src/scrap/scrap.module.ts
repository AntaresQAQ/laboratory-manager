import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ScrapEntity } from '@/scrap/scrap.entity';
import { ScrapService } from './scrap.service';

@Module({
  imports: [TypeOrmModule.forFeature([ScrapEntity])],
  providers: [ScrapService],
  exports: [ScrapService],
})
export class ScrapModule {}
