import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { BaseRepository } from '../../common/repositories/base.repositories';
import { I18nPath } from '../../i18n/i18n.generated';
import { CommentPost } from '../entities/comment-post.entity';

@Injectable()
export class CommentPostRepository extends BaseRepository<CommentPost> {
  entityNameI18nKey: I18nPath;
  constructor(dataSource: DataSource) {
    super(CommentPost, dataSource);
    this.entityNameI18nKey = 'common.word.commentPost';
  }
}
