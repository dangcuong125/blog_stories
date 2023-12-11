import { Injectable, Logger } from '@nestjs/common';
import * as firebaseAdmin from 'firebase-admin';
import {
  MessagingDeviceResult,
  MessagingPayload,
} from 'firebase-admin/lib/messaging/messaging-api';
import { chunk } from '../../common/utils';
import { PushNotiIntDto, PushNotiTestReqDto } from '../dtos/push-noti.dto';

@Injectable()
export class NotificationService {
  private logger = new Logger(NotificationService.name);

  async pushNoti(dto: PushNotiIntDto) {
    const { deviceTokens, payload } = dto;
    const result: MessagingDeviceResult[] = [];

    if (!deviceTokens?.length) {
      this.logger.error(
        `Invalid device tokens, deviceToken=${JSON.stringify(deviceTokens)}`,
      );

      return [];
    }

    for (const batch of chunk(deviceTokens, 1000)) {
      const batchResult = await firebaseAdmin
        .messaging()
        .sendToDevice(batch, payload);
      result.push(...batchResult.results);
    }

    return result;
  }

  async testDeviceToken(dto: PushNotiTestReqDto) {
    console.log('dto', dto);
    const { deviceTokens } = dto;
    const payload: MessagingPayload = {
      notification: { title: 'sasda\nasda\nss', body: 'asda \nasdsa\nsss' },
    };
    const response = await firebaseAdmin
      .messaging()
      .sendToDevice(deviceTokens, payload);
    console.log('response', JSON.stringify(response));
    return response;
  }
}
