import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ApparatusType } from '@/common/types';
import { ApparatusEntity } from '@/apparatus/apparatus.entity';
import { UserEntity } from '@/user/user.entity';

export enum ApprovalStatus {
  WAITING = '待审批',
  BUYING = '采购中',
  ARCHIVED = '已入库',
}

// 申请
@Entity('approval')
export class ApprovalEntity {
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

  // 价格
  @Column({ type: 'integer', nullable: true })
  price: number;

  // 数量
  @Column({ type: 'integer', nullable: false })
  amount: number;

  // 状态
  @Column({ type: 'enum', enum: ApprovalStatus })
  status: ApprovalStatus;

  // 申请日期
  @Column({ type: 'datetime', nullable: true })
  date: Date;

  // 通过时间
  @Column({ type: 'datetime', nullable: true })
  acceptedDate: Date;

  // 申请人
  @ManyToOne(() => UserEntity)
  @JoinColumn()
  person: Promise<UserEntity>;

  @Column({ nullable: true })
  personId: number;

  // 通过人
  @ManyToOne(() => UserEntity)
  @JoinColumn()
  acceptedPerson: Promise<UserEntity>;

  @Column({ nullable: true })
  acceptedPersonId: number;

  // 设备列表
  @OneToMany(() => ApparatusEntity, apparatus => apparatus.approval)
  apparatus: Promise<ApparatusEntity[]>;

  get isWaiting() {
    return this.status === ApprovalStatus.WAITING;
  }

  get isAccepted() {
    return this.status === ApprovalStatus.BUYING;
  }

  get isFinished() {
    return this.status === ApprovalStatus.ARCHIVED;
  }
}
