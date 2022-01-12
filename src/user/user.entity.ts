import { Column, Entity, Index, PrimaryGeneratedColumn } from 'typeorm';

export enum UserType {
  ADMIN = 'ADMIN',
  LEADER = 'LEADER',
  WORKER = 'WORKER',
}

@Entity('user')
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  // 用户名
  @Index({ unique: true })
  @Column({ type: 'varchar', nullable: false })
  username: string;

  // 密码hash
  @Column({ type: 'char', length: 60 })
  password: string;

  // 类型
  @Column({ type: 'enum', enum: UserType })
  type: UserType;

  get isAdmin() {
    return this.type === UserType.ADMIN;
  }

  get isLeader() {
    return this.isAdmin || this.type === UserType.LEADER;
  }

  get isWorker() {
    return this.isAdmin || this.type === UserType.WORKER;
  }
}
