import { User } from '../../../entities/user.entity';
import { CustomerGender, CustomerStatus } from '../../../enums/customer.enum';

export class ProfileCustomerResDto {
  id: number;
  email: string;
  name?: string;
  birthDate?: Date;
  status: CustomerStatus;
  userId: number;
  gender?: CustomerGender;
  avatarUrl?: string;

  static mapProperty(dto: ProfileCustomerResDto, user: User) {
    dto.id = user.id;
    dto.email = user.email;
    dto.name = user.name;
    dto.birthDate = user.birthDate;
    dto.gender = user.gender;
    // dto.avatarUrl = customer.avatar?.url;
  }
  static forCustomer(user: User) {
    if (!user) return null;

    const result = new ProfileCustomerResDto();
    this.mapProperty(result, user);

    return result;
  }
}
