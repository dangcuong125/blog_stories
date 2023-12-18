import { Module } from '@nestjs/common';
import { CommentPostRepository } from '../comment-post/repositories/comment-post.repository';
import { TypeOrmCustomModule } from '../common/typeorm-custom';
import { FavoritePostRepository } from '../favorite-post/repositories/favorite-post.repository';
import { FileRepository } from '../file/repositories/file.repository';
import { PostController } from './controllers/post.controller';
import { PostRepository } from './repositories/post.repository';
import { PostImagesRepository } from './repositories/psot-images.repository';
import { PostService } from './services/post.service';

@Module({
  imports: [
    TypeOrmCustomModule.forFeature([
      PostRepository,
      FileRepository,
      CommentPostRepository,
      FavoritePostRepository,
      PostImagesRepository,
    ]),
  ],
  controllers: [PostController],
  providers: [PostService],
})
export class PostModule {}
