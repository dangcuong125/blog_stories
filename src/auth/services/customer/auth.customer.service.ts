import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Transactional } from 'typeorm-transactional';
import { GlobalConfig } from '../../../common/config/global.config';
import { EncryptService } from '../../../utils/services/encrypt.service';
import {
  CustomerLoginReqDto,
  RegisterCustomerReqDto,
} from '../../dtos/customer/req/auth.customer.req.dto';
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
  ) {}
  async login(dto: CustomerLoginReqDto) {
    // const { email, password } = dto;
    // const customer = await this.customerRepo
    //   .createQueryBuilder('customer')
    //   .addSelect('customer.password')
    //   .innerJoinAndSelect('customer.user', 'user')
    //   .where('customer.email = :email', { email })
    //   .getOne();
    // if (!customer)
    //   throw new NotFoundExc({ message: 'auth.customer.customerNotFound' });
    // if (!bcrypt.compareSync(password, customer.password))
    //   throw new UnauthorizedExc({ message: 'auth.common.wrongOldPassword' });
    // const payload: JwtAuthPayload = { userId: customer.userId };
    // const accessToken = this.authCommonService.generateAccessToken(payload);
    // const refreshToken = this.authCommonService.generateRefreshToken(payload);
    // return AuthTokenResDto.forCustomer({ data: { accessToken, refreshToken } });
  }

  @Transactional()
  async register(dto: RegisterCustomerReqDto) {
    // const { email, password } = dto;
    // const existedCustomer = await this.customerRepo.findOneBy({ email });
    // if (existedCustomer)
    //   throw new NotFoundExc({ message: 'auth.customer.customerExits' });
    // const user = await this.userRepo.save({ type: UserType.CUSTOMER });
    // const customer = this.customerRepo.create({
    //   email,
    //   password: this.encryptService.encryptText(password),
    //   user,
    // });
    // await this.customerRepo.save(customer);
    // return CustomerResDto.forCustomer({ data: customer });
  }
}
