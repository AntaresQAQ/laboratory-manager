import { Column, Entity, ManyToOne, PrimaryGeneratedColumn, JoinColumn } from 'typeorm';
import { UserEntity } from '@/user/user.entity';
import { ApparatusStatus, ApparatusType } from '@/common/types';

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
  @Column({ type: 'integer', nullable: true })
  price: number;

  // 状态
  @Column({ type: 'enum', enum: ApparatusStatus })
  status: ApparatusStatus;

  // 负责人
  @ManyToOne(() => UserEntity)
  @JoinColumn()
  principal: Promise<UserEntity>;
}
