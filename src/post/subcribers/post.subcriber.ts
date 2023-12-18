import {
  DataSource,
  EntitySubscriberInterface,
  EventSubscriber,
  LoadEvent,
} from 'typeorm';
import { FavoritePostRepository } from '../../favorite-post/repositories/favorite-post.repository';
import { Post } from '../entities/post.entity';

@EventSubscriber()
export class MoPostRoommatesSubscriber
  implements EntitySubscriberInterface<Post>
{
  constructor(
    dataSource: DataSource,
    private favoritePostRepository: FavoritePostRepository,
  ) {
    dataSource.subscribers.push(this);
  }

  listenTo() {
    return Post;
  }

  async afterLoad(entity: Post, event?: LoadEvent<Post>) {
    // const favorites = await this.favoritePostRepository.findBy({
    //   postId: entity.id,
    // });
  }
}
