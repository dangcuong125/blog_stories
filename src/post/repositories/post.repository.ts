import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { BaseRepository } from '../../common/repositories/base.repositories';
import { I18nPath } from '../../i18n/i18n.generated';
import { Post } from '../entities/post.entity';

@Injectable()
export class PostRepository extends BaseRepository<Post> {
  entityNameI18nKey: I18nPath;
  constructor(dataSource: DataSource) {
    super(Post, dataSource);
    this.entityNameI18nKey = 'common.word.post';
  }
}
