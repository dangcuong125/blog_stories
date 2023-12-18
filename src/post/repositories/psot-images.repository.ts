import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { BaseRepository } from '../../common/repositories/base.repositories';
import { I18nPath } from '../../i18n/i18n.generated';
import { PostImages } from '../entities/post-images.entity';

@Injectable()
export class PostImagesRepository extends BaseRepository<PostImages> {
  entityNameI18nKey: I18nPath;
  constructor(dataSource: DataSource) {
    super(PostImages, dataSource);
    this.entityNameI18nKey = 'common.word.post';
  }
}
