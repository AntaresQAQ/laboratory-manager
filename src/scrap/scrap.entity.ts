import { Column, Entity, JoinColumn, OneToOne, PrimaryColumn } from 'typeorm';
import { ApparatusEntity } from '@/apparatus/apparatus.entity';

@Entity('scrap')
export class ScrapEntity {
  // 报废设备
  @OneToOne(() => ApparatusEntity, apparatus => apparatus.scrap)
  @JoinColumn()
  apparatus: Promise<ApparatusEntity>;

  @PrimaryColumn()
  apparatusId: number;

  // 报废时间
  @Column({ type: 'datetime', nullable: false })
  date: Date;

  // 报废原因
  @Column({ type: 'text' })
  reason: string;
}
