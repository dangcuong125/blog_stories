import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from '../../auth/entities/user.entity';
import { BaseEntity } from '../../common/entities/base.entity';
import { PostImages } from '../../post/entities/post-images.entity';

@Entity('file')
export class File extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'url' })
  url: string;

  @Column({ name: 'user_id', nullable: true })
  userId: number;

  @ManyToOne(() => User, (user) => user.files)
  @JoinColumn({ name: 'user_id' })
  uploader: User;

  @OneToMany(() => PostImages, (postImages) => postImages.image)
  postImages: PostImages[];
}
