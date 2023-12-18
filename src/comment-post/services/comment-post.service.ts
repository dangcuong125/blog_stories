import { Injectable } from '@nestjs/common';
import { User } from '../../auth/entities/user.entity';
import { paginate } from '../../common/typeorm-custom/paginate';
import { CreateCommentPostReqDto } from '../dtos/req/create-comment.req.dto';
import { GetListCommentPostReqDto } from '../dtos/req/get-comment.req.dto';
import { CommentPostRepository } from '../repositories/comment-post.repository';

@Injectable()
export class CommentPostService {
  constructor(private commentPostRepository: CommentPostRepository) {}

  async createComment(user: User, body: CreateCommentPostReqDto) {
    const { content, postId } = body;
    return this.commentPostRepository.save({
      content,
      postId,
      userId: user.id,
    });
  }

  async getListComments(query: GetListCommentPostReqDto) {
    const { postId, limit, page } = query;

    const queryBuilder = this.commentPostRepository
      .createQueryBuilder('commentPost')
      .leftJoinAndSelect('commentPost.user', 'user')
      .leftJoinAndSelect('user.avatar', 'avatar')
      .where('commentPost.id = :postId', { postId: postId });

    const { items, meta } = await paginate(queryBuilder, { limit, page });

    return { items, meta };
  }
}
