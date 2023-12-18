import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { BaseRepository } from '../../common/repositories/base.repositories';
import { I18nPath } from '../../i18n/i18n.generated';
import { Notification } from '../entities/notification.entity';

@Injectable()
export class NotificationRepository extends BaseRepository<Notification> {
  entityNameI18nKey: I18nPath;
  constructor(dataSource: DataSource) {
    super(Notification, dataSource);
    this.entityNameI18nKey = 'common.word.notification';
  }
}
