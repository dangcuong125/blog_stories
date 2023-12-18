import { Module } from '@nestjs/common';
import { TypeOrmCustomModule } from '../common/typeorm-custom';
import { CommentPostController } from './controllers/comment-post.controller';
import { CommentPostRepository } from './repositories/comment-post.repository';
import { CommentPostService } from './services/comment-post.service';

@Module({
  imports: [TypeOrmCustomModule.forFeature([CommentPostRepository])],
  controllers: [CommentPostController],
  providers: [CommentPostService],
})
export class CommentPostModule {}
