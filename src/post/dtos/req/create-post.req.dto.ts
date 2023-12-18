import {
  IsValidArrayNumber,
  IsValidText,
} from '../../../common/decorators/custom-validator.decorator';

export class CreatePostReqDto {
  @IsValidText()
  content: string;

  @IsValidArrayNumber()
  images: number[];
}
