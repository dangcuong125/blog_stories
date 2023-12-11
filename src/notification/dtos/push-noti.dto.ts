import { MessagingPayload } from 'firebase-admin/lib/messaging/messaging-api';
import { IsValidArrayString } from '../../common/decorators/custom-validator.decorator';
import { NonFunctionProperties } from '../../common/types/utils.type';

export class PushNotiTestReqDto {
  @IsValidArrayString({ minSize: 1, unique: false })
  deviceTokens: string[];
}

export class PushNotiIntDto {
  deviceTokens: string[];
  payload: MessagingPayload;

  constructor(data: NonFunctionProperties<PushNotiIntDto>) {
    this.deviceTokens = data.deviceTokens;
    this.payload = data.payload;
  }
}
