import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({
    default: 'zh',
  })
  username: string;
  @Column({
    default: '',
  })
  private_key: string;
  @Column({
    default: '',
  })
  @CreateDateColumn()
  createdAt: Date;
}
