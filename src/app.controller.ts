import { Controller, Get } from '@nestjs/common';
import { I18n, I18nContext } from 'nestjs-i18n';
import { AppService } from './app.service';
import { User } from './auth/entities/user.entity';
import {
  AuthenticateCustomer,
  CurrentUser,
} from './common/decorators/auth.decorator';
import { I18nTranslations } from './i18n/i18n.generated';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @AuthenticateCustomer()
  getHello(
    @I18n() i18nContext: I18nContext<I18nTranslations>,
    @CurrentUser() user: User,
  ) {
    return user;
  }
}
