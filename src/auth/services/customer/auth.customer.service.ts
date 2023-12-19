import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Transactional } from 'typeorm-transactional';
import { GlobalConfig } from '../../../common/config/global.config';
import { NotFoundExc } from '../../../common/exceptions/custom.exception';
import { FileRepository } from '../../../file/repositories/file.repository';
import { EncryptService } from '../../../utils/services/encrypt.service';
import { AuthTokenResDto } from '../../dtos/common/res/auth-token.res.dto';
import {
  CustomerLoginReqDto,
  RefreshTokenDto,
  RegisterCustomerReqDto,
} from '../../dtos/customer/req/auth.customer.req.dto';
import { JwtAuthPayload } from '../../interfaces/jwt-payload.interface';
import { TokenRepository } from '../../repositories/token.repository';
import { UserRepository } from '../../repositories/user.repository';
import { AuthCommonService } from '../common/auth.common.service';

@Injectable()
export class AuthCustomerService {
  constructor(
    private userRepo: UserRepository,
    private jwtService: JwtService,
    private encryptService: EncryptService,
    private authCommonService: AuthCommonService,
    private configService: ConfigService<GlobalConfig>,
    private tokenRepository: TokenRepository,
    private fileRepo: FileRepository,
  ) {}

  @Transactional()
  async login(dto: CustomerLoginReqDto) {
    const { email, deviceToken, firId } = dto;
    const user = await this.userRepo.findOne({
      where: {
        email,
        firId,
      },
    });
    if (!user)
      throw new NotFoundExc({ message: 'auth.customer.customerNotFound' });

    const tokens = await this.tokenRepository.findBy({
      userId: user.id,
      deviceToken: deviceToken,
    });
    if (!tokens.length) {
      await this.tokenRepository.save({
        userId: user.id,
        deviceToken,
      });
    }
    const payload: JwtAuthPayload = { userId: user.id };
    const accessToken = this.authCommonService.generateAccessToken(payload);
    const refreshToken = this.authCommonService.generateRefreshToken(payload);
    return AuthTokenResDto.forCustomer({ data: { accessToken, refreshToken } });
  }

  @Transactional()
  async register(dto: RegisterCustomerReqDto) {
    const { deviceToken, email, firId, avatar, name } = dto;
    console.log(dto);
    const user = await this.userRepo.findOneBy({
      email,
      firId,
    });
    if (user) throw new NotFoundExc({ message: 'auth.customer.customerExits' });

    const file = await this.fileRepo.save({
      url: avatar,
    });

    const userCreated = await this.userRepo.save({
      name,
      avatarId: file.id,
      email,
      firId,
    });
    file.userId = userCreated.id;

    await Promise.all([
      this.fileRepo.save(file),
      this.tokenRepository.save({
        deviceToken,
        userId: userCreated.id,
      }),
    ]);

    const payload: JwtAuthPayload = { userId: userCreated.id };
    const accessToken = this.authCommonService.generateAccessToken(payload);
    const refreshToken = this.authCommonService.generateRefreshToken(payload);
    return AuthTokenResDto.forCustomer({ data: { accessToken, refreshToken } });
  }

  async refreshToken(body: RefreshTokenDto) {
    const { refreshToken } = body;
    const payload = this.jwtService.verify<JwtAuthPayload>(refreshToken, {
      secret: this.configService.get('auth.refreshToken.secret'),
    });
    const accessToken = this.authCommonService.generateAccessToken({
      userId: payload.userId,
    });

    return AuthTokenResDto.forCustomer({ data: { accessToken, refreshToken } });
  }
}
