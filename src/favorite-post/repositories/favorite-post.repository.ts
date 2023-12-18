import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { BaseRepository } from '../../common/repositories/base.repositories';
import { I18nPath } from '../../i18n/i18n.generated';
import { FavoritePost } from '../entities/favorite-post.entity';

@Injectable()
export class FavoritePostRepository extends BaseRepository<FavoritePost> {
  entityNameI18nKey: I18nPath;
  constructor(dataSource: DataSource) {
    super(FavoritePost, dataSource);
    this.entityNameI18nKey = 'common.word.favoritePost';
  }
}
