import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from '../../auth/entities/user.entity';
import { CommentPost } from '../../comment-post/entities/comment-post.entity';
import { BaseEntity } from '../../common/entities/base.entity';
import { FavoritePost } from '../../favorite-post/entities/favorite-post.entity';
import { Notification } from '../../notification/entities/notification.entity';
import { PostImages } from './post-images.entity';

@Entity('post')
export class Post extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'content' })
  content: string;

  @Column({ name: 'user_id' })
  userId: number;

  @ManyToOne(() => User, (user) => user.post)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @OneToMany(() => FavoritePost, (favoritePost) => favoritePost.post)
  favoritePosts: FavoritePost[];

  @OneToMany(() => CommentPost, (commentPost) => commentPost.post)
  commentPosts: CommentPost[];

  @OneToMany(() => Notification, (notification) => notification.post)
  notifications: Notification[];

  @OneToMany(() => PostImages, (postImages) => postImages.post)
  postImages: PostImages[];

  isLike: boolean;

  totalComments: number;
}
