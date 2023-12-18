import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { BaseEntity } from '../../common/entities/base.entity';
import { File } from '../../file/entities/file.entity';
import { Post } from './post.entity';

@Entity('post_images')
export class PostImages extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'post_id' })
  postId: number;

  @ManyToOne(() => Post, (post) => post.postImages)
  @JoinColumn({ name: 'post_id' })
  post: Post;

  @Column({ name: 'image_id' })
  imageId: number;

  @ManyToOne(() => File, (file) => file.postImages)
  @JoinColumn({ name: 'image_id' })
  image: File;
}
