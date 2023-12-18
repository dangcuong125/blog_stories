import {
  IsValidNumber,
  IsValidText,
} from '../../../common/decorators/custom-validator.decorator';

export class CreateCommentPostReqDto {
  @IsValidText()
  content: string;

  @IsValidNumber()
  postId: number;
}
