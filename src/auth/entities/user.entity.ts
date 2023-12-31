import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { CommentPost } from '../../comment-post/entities/comment-post.entity';
import { BaseEntity } from '../../common/entities/base.entity';
import { FavoritePost } from '../../favorite-post/entities/favorite-post.entity';
import { File } from '../../file/entities/file.entity';
import { Post } from '../../post/entities/post.entity';
import { CustomerGender } from '../enums/customer.enum';
import { Token } from './token.entity';

@Entity('user')
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'fir_id' })
  firId: string;

  @Column({ length: 255 })
  email: string;

  @Column({ name: 'name', length: 50, nullable: true })
  name: string;

  @Column({ name: 'birth_date', type: 'timestamptz', nullable: true })
  birthDate: Date;

  @Column({ type: 'enum', enum: CustomerGender, nullable: true })
  gender: CustomerGender;

  @OneToMany(() => File, (file) => file.uploader)
  files: File[];

  @OneToMany(() => Token, (token) => token.user)
  tokens: Token[];

  @Column({ name: 'avatar_id', nullable: true })
  avatarId: number;

  @OneToMany(() => Post, (post) => post.user)
  post: Post[];

  @ManyToOne(() => File)
  @JoinColumn({ name: 'avatar_id' })
  avatar: File;

  @OneToMany(() => FavoritePost, (favoritePost) => favoritePost.user)
  favoritePosts: FavoritePost[];

  @OneToMany(() => CommentPost, (commentPost) => commentPost.user)
  commentPost: CommentPost[];
}
