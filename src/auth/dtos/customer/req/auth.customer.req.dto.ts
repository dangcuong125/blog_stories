import { IsEmail } from 'class-validator';
import { IsValidText } from '../../../../common/decorators/custom-validator.decorator';
import { I18nPath } from '../../../../i18n/i18n.generated';

export class CustomerLoginReqDto {
  @IsEmail({}, { message: 'auth.customer.invalidEmail' as I18nPath })
  email: string;

  @IsValidText()
  firId: string;

  @IsValidText()
  deviceToken: string;
}

export class RegisterCustomerReqDto {
  @IsEmail({}, { message: 'auth.customer.invalidEmail' as I18nPath })
  email: string;

  @IsValidText({ required: false })
  avatar?: string;

  @IsValidText({ required: false })
  name?: string;

  @IsValidText()
  firId: string;

  @IsValidText()
  deviceToken: string;
}
