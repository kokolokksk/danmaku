import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
} from 'typeorm';

@Entity()
export class LiveInfo {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({
    default: 'zh',
  })
  roomid: number;
  @Column({
    default: '',
  })
  real_roomid: number;
  @Column({
    default: '',
  })
  area_id: string;
  @Column({
    default: '',
  })
  parent_area_id: string;
  @Column({
    default: '',
  })
  uid: number;
  @Column()
  key: string;
  @Column({
    default: '',
  })
  buvid: string;
  @Column({
    default: '',
  })
  protover: number;
  @CreateDateColumn()
  createdAt: Date;
}
