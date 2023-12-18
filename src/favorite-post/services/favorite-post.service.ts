import { Injectable } from '@nestjs/common';
import { User } from '../../auth/entities/user.entity';
import { FavoritePostRepository } from '../repositories/favorite-post.repository';

@Injectable()
export class FavoritePostService {
  constructor(private favoritePostRepository: FavoritePostRepository) {}

  async toggleFavoritePost(user: User, postId: number) {
    console.log(postId);
    const favoritePost = await this.favoritePostRepository.findOneBy({
      userId: user.id,
      postId: postId,
    });
    if (!favoritePost) {
      return this.favoritePostRepository.save({
        postId: postId,
        userId: user.id,
      });
    }
    return favoritePost;
  }
}
