import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { BaseEntity } from '../../common/entities/base.entity';
import { User } from './user.entity';

@Entity('token')
export class Token extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'device_token' })
  deviceToken: string;

  @Column({ name: 'fir_id' })
  firId: string;

  @ManyToOne(() => User, (user) => user.tokens)
  @JoinColumn({ name: 'user_id' })
  user: User;
}
