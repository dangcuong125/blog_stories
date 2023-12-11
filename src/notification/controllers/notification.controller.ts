import { Body, Controller, Post } from '@nestjs/common';
import { PushNotiTestReqDto } from '../dtos/push-noti.dto';
import { NotificationService } from '../services/notification.service';

@Controller('notification')
export class NotificationController {
  constructor(private notificationService: NotificationService) {}

  @Post()
  testPushNoti(@Body() body: PushNotiTestReqDto) {
    return this.notificationService.testDeviceToken(body);
  }
}
