import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { GlobalConfig } from '../common/config/global.config';
import { TypeOrmCustomModule } from '../common/typeorm-custom';
import { FileRepository } from '../file/repositories/file.repository';
import { UtilsModule } from '../utils/utils.module';
import { AuthCustomerController } from './controllers/customer/auth.customer.controller';
import { TokenRepository } from './repositories/token.repository';
import { UserRepository } from './repositories/user.repository';
import { AuthCommonService } from './services/common/auth.common.service';
import { AuthCustomerService } from './services/customer/auth.customer.service';
import { JwtAuthenUserStrategy } from './strategies/jwt-authen.user.strategy';

@Module({
  imports: [
    PassportModule,
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService<GlobalConfig>) => ({
        secret: configService.get('auth.accessToken.secret'),
        signOptions: {
          algorithm: configService.get('auth.accessToken.algorithm'),
        },
      }),
    }),
    TypeOrmCustomModule.forFeature([
      UserRepository,
      FileRepository,
      TokenRepository,
    ]),
    UtilsModule,
    // forwardRef(() => FileModule),
  ],
  controllers: [AuthCustomerController],
  providers: [AuthCustomerService, AuthCommonService, JwtAuthenUserStrategy],
})
export class AuthModule {}
