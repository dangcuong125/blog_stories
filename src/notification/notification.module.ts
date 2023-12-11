import { Module } from '@nestjs/common';
import { NotificationController } from './controllers/notification.controller';
import { NotificationListenerService } from './listeners/notification.listener';
import { NotificationService } from './services/notification.service';

@Module({
  controllers: [NotificationController],
  providers: [NotificationService, NotificationListenerService],
})
export class NotificationModule {}
