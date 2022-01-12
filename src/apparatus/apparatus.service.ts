import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ApparatusEntity } from '@/apparatus/apparatus.entity';
import { Repository } from 'typeorm';
import { ApparatusStatus, ApparatusType } from '@/common/types';

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
    return await this.apparatusRepository.find({ type, status });
  }
}
