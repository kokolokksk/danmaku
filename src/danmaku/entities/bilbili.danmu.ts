import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
} from 'typeorm';

@Entity()
export class BiliBiliDanmu {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({
    default: 'zh',
  })
  type: number;
  @Column({
    default: '',
  })
  origin?: string;
  @Column({
    default: '',
  })
  uid: number;
  @Column()
  nickname: string;
  @Column({
    default: '',
  })
  content?: string;
  @Column({
    default: '',
  })
  price: number | 0;
  giftName?: string;
  @Column({
    default: '',
  })
  giftType?: number;
  giftNum: number;
  color?: string;
  @Column({
    default: '',
  })
  borderColor?: string;
  @Column({
    default: '',
  })
  priceColor?: string;
  @Column({
    default: '',
  })
  noBorder?: boolean;
  giftImg?: string;
  @Column({
    default: '',
  })
  timestamp: number;
  fansLevel?: number;
  fansName?: string;
  @Column({
    default: '',
  })
  avatarFace?: string;
  @Column({
    default: '',
  })
  @CreateDateColumn()
  createdAt: Date;
}
