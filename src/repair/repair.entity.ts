import {
  Column,
  Entity,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ApparatusEntity } from '@/apparatus/apparatus.entity';
import { UserEntity } from '@/user/user.entity';

@Entity('repair')
export class RepairEntity {
  @PrimaryGeneratedColumn()
  id: number;

  // 修理时间
  @Column({ type: 'datetime', nullable: false })
  date: Date;

  // 价格
  @Column({ type: 'double', nullable: false })
  price: number;

  @Column({ type: 'boolean', default: false })
  finished: boolean;

  // 送修人
  @ManyToOne(() => UserEntity)
  @JoinColumn()
  person: Promise<UserEntity>;

  @Column()
  personId: number;

  // 设备
  @ManyToOne(() => ApparatusEntity, apparatus => apparatus.repairs)
  @JoinColumn()
  apparatus: Promise<ApparatusEntity>;

  @Column()
  apparatusId: number;
}
