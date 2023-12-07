import { IsEmail } from 'class-validator';
import { IsValidText } from '../../../../common/decorators/custom-validator.decorator';
import { I18nPath } from '../../../../i18n/i18n.generated';

export class CustomerLoginReqDto {
  @IsEmail({}, { message: 'auth.customer.invalidEmail' as I18nPath })
  email: string;

  @IsValidText({
    minLength: 6,
    message: ['common.word.password', 'common.word.invalid'],
  })
  password: string;
}

export class RegisterCustomerReqDto {
  @IsEmail({}, { message: 'auth.customer.invalidEmail' as I18nPath })
  email: string;

  @IsValidText({ minLength: 6, message: 'auth.customer.invalidPassword' })
  password: string;
}
