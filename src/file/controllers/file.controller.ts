import {
  Controller,
  Post,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { AnyFilesInterceptor } from '@nestjs/platform-express';
import { ApiConsumes, ApiTags } from '@nestjs/swagger';
import { User } from '../../auth/entities/user.entity';
import {
  AuthenticateUser,
  CurrentUser,
} from '../../common/decorators/auth.decorator';
import { ApiMultiFile } from '../../common/decorators/file.decorator';
import { FileService } from '../services/file.service';

@Controller('file')
@ApiTags('File Controller')
@AuthenticateUser()
export class FileController {
  constructor(private fileService: FileService) {}

  @Post('image')
  @ApiConsumes('multipart/form-data')
  @ApiMultiFile('images')
  @UseInterceptors(AnyFilesInterceptor())
  async uploadImage(
    @UploadedFiles() files: Array<Express.Multer.File>,
    @CurrentUser() user: User,
  ) {
    return this.fileService.uploadMultipleImages(files, user);
  }
}
