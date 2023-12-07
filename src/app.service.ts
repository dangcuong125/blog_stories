import { Injectable } from '@nestjs/common';
import { I18nContext } from 'nestjs-i18n';
import { I18nTranslations } from './i18n/i18n.generated';

@Injectable()
export class AppService {
  constructor() {}

  async getHello(i18nContext: I18nContext<I18nTranslations>) {
    const result = i18nContext.t('test.params', {
      args: { argument: 'hello' },
    });
    return result;
  }
}
