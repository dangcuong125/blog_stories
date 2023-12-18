import { Controller, Get } from '@nestjs/common';
import { User } from './auth/entities/user.entity';
import {
  AuthenticateUser,
  CurrentUser,
} from './common/decorators/auth.decorator';

@Controller()
@AuthenticateUser()
export class AppController {
  constructor() {}

  @Get()
  getHello(@CurrentUser() user: User) {
    return user;
  }
}
