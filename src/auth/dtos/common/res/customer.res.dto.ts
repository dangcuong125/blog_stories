import {
  BaseResponseDtoParams,
  ResOptionDto,
} from '../../../../common/dtos/base.res';
import { User } from '../../../entities/user.entity';
import { CustomerGender, CustomerStatus } from '../../../enums/customer.enum';

export interface CustomerResDtoParams extends BaseResponseDtoParams {
  dto?: CustomerResDto;
  data?: User;
  resOpts?: ResOptionDto;
}

export class CustomerResDto {
  id: number;
  address: string;
  email: string;
  name: string;
  birthDate: Date;
  gender: CustomerGender;
  createdAt: Date;
  userId: number;
  status: CustomerStatus;

  static mapProperty({ dto, data }: CustomerResDtoParams) {
    dto.id = data.id;
    dto.email = data.email;
    dto.name = data.name;
    dto.birthDate = data.birthDate;

    dto.createdAt = data.createdAt;
    dto.gender = data.gender;
  }

  static forCustomer({ data, resOpts }: CustomerResDtoParams) {
    if (!data) return null;

    const result = new CustomerResDto();

    this.mapProperty({
      dto: result,
      data: data,
    });

    // result.avatar = FileResDto.forCustomer({ data: data.avatar, resOpts });

    return result;
  }

  static forAdmin(params: CustomerResDtoParams) {
    const { data, resOpts } = params;

    const result = new CustomerResDto();
    if (!data) return null;

    this.mapProperty({ dto: result, data: data });

    return result;
  }
}
