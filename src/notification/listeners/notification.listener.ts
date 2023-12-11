import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { EventName } from '../../common/enums/event.enum';
import { PushNotiIntDto } from '../dtos/push-noti.dto';
import { NotificationService } from '../services/notification.service';

@Injectable()
export class NotificationListenerService {
  constructor(private notificationService: NotificationService) {}
  @OnEvent(EventName.NOTI_PUSHED)
  async pushNotifications(body: PushNotiIntDto) {
    await this.notificationService.pushNoti(body);
  }
}
