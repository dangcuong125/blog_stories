import { IsValidNumber } from '../../../common/decorators/custom-validator.decorator';
import { PaginationReqDto } from '../../../common/dtos/pagination.dto';

export class GetListCommentPostReqDto extends PaginationReqDto {
  @IsValidNumber()
  postId: number;
}
