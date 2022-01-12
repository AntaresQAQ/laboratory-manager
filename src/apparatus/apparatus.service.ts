import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ApparatusEntity, ApparatusStatus } from '@/apparatus/apparatus.entity';
import { Repository } from 'typeorm';
import { ApparatusType } from '@/common/types';

@Injectable()
export class ApparatusService {
  constructor(
    @InjectRepository(ApparatusEntity)
    private readonly apparatusRepository: Repository<ApparatusEntity>,
  ) {}

  async findApparatusById(id: number): Promise<ApparatusEntity> {
    return await this.apparatusRepository.findOne({ id });
  }

  async findApparatusByTypeAndStatus(
    type?: ApparatusType,
    status?: ApparatusStatus,
  ): Promise<ApparatusEntity[]> {
    const queryBuilder = this.apparatusRepository.createQueryBuilder();
    if (type) {
      queryBuilder.andWhere('type = :type', { type });
    }
    if (status) {
      queryBuilder.andWhere('status = :status', { status });
    }
    return await queryBuilder.getMany();
  }
}
