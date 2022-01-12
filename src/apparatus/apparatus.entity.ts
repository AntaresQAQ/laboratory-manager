import {
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  JoinColumn,
  OneToMany,
  OneToOne,
} from 'typeorm';
import { UserEntity } from '@/user/user.entity';
import { ApparatusType } from '@/common/types';
import { RepairEntity } from '@/repair/repair.entity';
import { ScrapEntity } from '@/scrap/scrap.entity';
import { ApprovalEntity } from '@/approval/approval.entity';

export enum ApparatusStatus {
  NORMAL = '正常',
  REPAIRING = '修理中',
  SCRAPPED = '已报废',
}

// 设备
@Entity('apparatus')
export class ApparatusEntity {
  @PrimaryGeneratedColumn()
  id: number;

  // 设备名
  @Column({ type: 'varchar', nullable: false })
  name: string;

  // 型号
  @Column({ type: 'varchar', nullable: true })
  model: string;

  // 类型
  @Column({ type: 'enum', enum: ApparatusType })
  type: ApparatusType;

  // 厂家
  @Column({ type: 'varchar', nullable: true })
  factory: string;

  // 购置日期
  @Column({ type: 'datetime', nullable: true })
  date: Date;

  // 价格
  @Column({ type: 'double', nullable: true })
  price: number;

  // 状态
  @Column({ type: 'enum', enum: ApparatusStatus })
  status: ApparatusStatus;

  // 负责人
  @ManyToOne(() => UserEntity)
  @JoinColumn()
  person: Promise<UserEntity>;

  @Column()
  personId: number;

  // 申请表
  @ManyToOne(() => ApprovalEntity, approval => approval.apparatus)
  approval: Promise<ApprovalEntity>;

  @Column()
  approvalId: number;

  // 维修记录
  @OneToMany(() => RepairEntity, repair => repair.apparatus)
  repairs: Promise<RepairEntity[]>;

  // 报废记录
  @OneToOne(() => ScrapEntity, scrap => scrap.apparatus)
  scrap: Promise<ScrapEntity>;
}
