import { Injectable } from '@nestjs/common';
import { InjectConnection } from '@nestjs/typeorm';
import { Connection } from 'typeorm';
import { ApparatusEntity, ApparatusStatus } from '@/apparatus/apparatus.entity';
import { ScrapEntity } from '@/scrap/scrap.entity';

@Injectable()
export class ScrapService {
  constructor(
    @InjectConnection()
    private readonly connection: Connection,
  ) {}

  async createScrap(apparatus: ApparatusEntity, reason: string) {
    await this.connection.transaction('READ COMMITTED', async entityManager => {
      apparatus.status = ApparatusStatus.SCRAPPED;
      await entityManager.save(apparatus);
      const scrap = new ScrapEntity();
      scrap.apparatusId = apparatus.id;
      scrap.reason = reason;
      scrap.date = new Date();
      await entityManager.save(scrap);
    });
  }
}
