import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { BaseRepository } from '../../common/repositories/base.repositories';
import { I18nPath } from '../../i18n/i18n.generated';
import { Token } from '../entities/token.entity';

@Injectable()
export class TokenRepository extends BaseRepository<Token> {
  entityNameI18nKey: I18nPath;
  constructor(dataSource: DataSource) {
    super(Token, dataSource);
    this.entityNameI18nKey = 'common.word.token';
  }
}
