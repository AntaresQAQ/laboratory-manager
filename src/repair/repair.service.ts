import { Injectable } from '@nestjs/common';
import { InjectConnection, InjectRepository } from '@nestjs/typeorm';
import { Connection, Repository } from 'typeorm';
import { RepairEntity } from '@/repair/repair.entity';
import { UserEntity } from '@/user/user.entity';
import { ApparatusEntity, ApparatusStatus } from '@/apparatus/apparatus.entity';

@Injectable()
export class RepairService {
  constructor(
    @InjectConnection()
    private readonly connection: Connection,
    @InjectRepository(RepairEntity)
    private readonly repairRepository: Repository<RepairEntity>,
  ) {}

  async findRepairById(id: number): Promise<RepairEntity> {
    return await this.repairRepository.findOne(id);
  }

  async findRepairs(finished?: boolean): Promise<RepairEntity[]> {
    if (finished === undefined) {
      return await this.repairRepository.find({ order: { id: 'DESC' } });
    } else {
      return await this.repairRepository.find({
        where: { finished },
        order: { id: 'DESC' },
      });
    }
  }

  async createRepair(
    person: UserEntity,
    apparatus: ApparatusEntity,
    price: number,
  ): Promise<RepairEntity> {
    let repair: RepairEntity;
    await this.connection.transaction('READ COMMITTED', async entityManager => {
      apparatus.status = ApparatusStatus.REPAIRING;
      await entityManager.save(apparatus);
      repair = new RepairEntity();
      repair.price = price;
      repair.date = new Date();
      repair.apparatusId = apparatus.id;
      repair.personId = person.id;
      await entityManager.save(repair);
    });
    return repair;
  }

  async finishRepair(repair: RepairEntity): Promise<void> {
    await this.connection.transaction('READ COMMITTED', async entityManager => {
      const apparatus = await repair.apparatus;
      apparatus.status = ApparatusStatus.NORMAL;
      await entityManager.save(apparatus);
      repair.finished = true;
      await entityManager.save(repair);
    });
  }
}
