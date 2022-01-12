import { Injectable } from '@nestjs/common';
import { InjectConnection, InjectRepository } from '@nestjs/typeorm';
import { ApprovalEntity, ApprovalStatus } from '@/approval/approval.entity';
import { Connection, Repository } from 'typeorm';
import { ApparatusType } from '@/common/types';
import { UserEntity } from '@/user/user.entity';
import { ApparatusEntity, ApparatusStatus } from '@/apparatus/apparatus.entity';

@Injectable()
export class ApprovalService {
  constructor(
    @InjectConnection()
    private readonly connection: Connection,
    @InjectRepository(ApprovalEntity)
    private readonly approvalRepository: Repository<ApprovalEntity>,
  ) {}

  async findApprovalById(id: number): Promise<ApprovalEntity> {
    return await this.approvalRepository.findOne({ id });
  }

  async createApproval(
    person: UserEntity,
    name: string,
    model: string,
    type: ApparatusType,
    factory: string,
    price: number,
    amount: number,
  ): Promise<ApprovalEntity> {
    const approval = new ApprovalEntity();
    approval.name = name;
    approval.model = model;
    approval.type = type;
    approval.factory = factory;
    approval.price = price;
    approval.amount = amount;
    approval.date = new Date();
    approval.status = ApprovalStatus.WAITING;
    approval.personId = person.id;
    await this.approvalRepository.save(approval);
    return approval;
  }

  async acceptApproval(person: UserEntity, approval: ApprovalEntity): Promise<boolean> {
    if (approval.status !== ApprovalStatus.WAITING) {
      return false;
    }
    approval.status = ApprovalStatus.BUYING;
    approval.acceptedDate = new Date();
    approval.acceptedPersonId = person.id;
    await this.approvalRepository.save(approval);
    return true;
  }

  async refuseApproval(approval: ApprovalEntity) {
    if (approval.status !== ApprovalStatus.WAITING) {
      return false;
    }
    await this.approvalRepository.delete(approval);
    return true;
  }

  async finishApproval(person: UserEntity, approval: ApprovalEntity) {
    if (approval.status !== ApprovalStatus.BUYING) {
      return false;
    }
    const date = new Date();
    await this.connection.transaction('READ COMMITTED', async entityManager => {
      approval.status = ApprovalStatus.ARCHIVED;
      await entityManager.save(approval);
      const apparatuses: ApparatusEntity[] = [];
      for (let i = 1; i <= approval.amount; i++) {
        const apparatus = new ApparatusEntity();
        apparatus.name = approval.name;
        apparatus.model = approval.model;
        apparatus.type = approval.type;
        apparatus.factory = approval.factory;
        apparatus.date = date;
        apparatus.price = approval.price;
        apparatus.status = ApparatusStatus.NORMAL;
        apparatus.personId = person.id;
        apparatus.approvalId = approval.id;
        apparatuses.push(apparatus);
      }
      await entityManager.save(apparatuses);
    });
  }
}
