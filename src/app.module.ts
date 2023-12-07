import { RedisModule } from '@liaoliaots/nestjs-redis';
import { Module, OnModuleInit, ValidationPipe } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_FILTER, APP_PIPE, ModuleRef } from '@nestjs/core';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { TypeOrmModule } from '@nestjs/typeorm';
import dayjs from 'dayjs';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';
import {
  AcceptLanguageResolver,
  HeaderResolver,
  I18nModule,
  QueryResolver,
} from 'nestjs-i18n';
import * as path from 'path';
import {
  addTransactionalDataSource,
  initializeTransactionalContext,
} from 'typeorm-transactional';
import { AppController } from './app.controller';
import { AppService } from './app.service';
// import { bullConfig } from './common/config/bull.config';
import firebaseAdmin from 'firebase-admin';
import { dataSource } from '../data-source';
import { AuthModule } from './auth/auth.module';
import globalConfig, { GlobalConfig } from './common/config/global.config';
import { redisConfig } from './common/config/redis.config';
import { TIME_ZONE } from './common/constants/global.constant';
import { AppEnvironment } from './common/enums/app.enum';
import { AllExceptionsFilter } from './common/filters/all.filter';
import { UtilsModule } from './utils/utils.module';
import { FileModule } from './file/file.module';

@Module({
  imports: [
    // BullModule.forRootAsync(bullConfig),
    RedisModule.forRootAsync(redisConfig),
    EventEmitterModule.forRoot(),
    ConfigModule.forRoot({
      isGlobal: true,
      load: [() => globalConfig],
      cache: true,
    }),
    TypeOrmModule.forRootAsync({
      useFactory: () => ({}),
      dataSourceFactory: async () => {
        initializeTransactionalContext();
        return addTransactionalDataSource(dataSource);
      },
    }),
    I18nModule.forRoot({
      fallbackLanguage: 'vi',
      loaderOptions: { path: path.join(__dirname, 'i18n'), watch: true },
      resolvers: [
        new QueryResolver(['lang', 'l']),
        new HeaderResolver(['lang', 'l']),
        AcceptLanguageResolver,
      ],
      typesOutputPath: path.join(process.cwd(), '/src/i18n/i18n.generated.ts'),
    }),
    UtilsModule,
    AuthModule,
    FileModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_PIPE,
      useValue: new ValidationPipe({
        transform: true,
        transformOptions: { exposeDefaultValues: true },
      }),
    },
    { provide: APP_FILTER, useClass: AllExceptionsFilter },
  ],
})
export class AppModule implements OnModuleInit {
  constructor(
    private configService: ConfigService<GlobalConfig>,
    private moduleRef: ModuleRef,
  ) {}

  async onModuleInit() {
    await dataSource.query('CREATE extension IF NOT EXISTS pgcrypto');
    dayjs.extend(utc);
    dayjs.extend(timezone);
    dayjs.tz.setDefault(TIME_ZONE);

    firebaseAdmin.initializeApp({
      credential: firebaseAdmin.credential.cert({
        privateKey: this.configService
          .get<string>('firebase.privateKey')
          .replace(/\\n/gm, '\n'),
        clientEmail: this.configService.get('firebase.clientEmail'),
        projectId: this.configService.get('firebase.projectId'),
      } as Partial<firebaseAdmin.ServiceAccount>),
    });

    const isLocalOrTest = [AppEnvironment.LOCAL, AppEnvironment.TEST].includes(
      this.configService.get('environment'),
    );

    if (isLocalOrTest) return;
  }
}
