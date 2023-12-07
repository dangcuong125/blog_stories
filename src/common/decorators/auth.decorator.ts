import {
  applyDecorators,
  createParamDecorator,
  ExecutionContext,
  SetMetadata,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthenAdminGuard } from '../../auth/guards/jwt-authen.admin.guard';
import { JwtAuthenCustomerGuard } from '../../auth/guards/jwt-authen.customer.guard';
import { JwtAuthenUserGuard } from '../../auth/guards/jwt-authen.user.guard';

export const IS_PUBLIC_KEY = Symbol();
export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);

export const AuthenticateCustomer = () =>
  applyDecorators(UseGuards(JwtAuthenCustomerGuard), ApiBearerAuth());

export const AuthenticateAdmin = () =>
  applyDecorators(UseGuards(JwtAuthenAdminGuard), ApiBearerAuth());

export const AuthenticateUser = () =>
  applyDecorators(UseGuards(JwtAuthenUserGuard), ApiBearerAuth());

export const CurrentUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return request.user;
  },
);
