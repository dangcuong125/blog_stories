import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { User } from '../../auth/entities/user.entity';
import {
  AuthenticateUser,
  CurrentUser,
} from '../../common/decorators/auth.decorator';
import { CreatePostReqDto } from '../dtos/req/create-post.req.dto';
import { GetPostReqDto } from '../dtos/req/get-post.req.dto';
import { PostService } from '../services/post.service';

@Controller('post')
@ApiTags('Post Controller')
@AuthenticateUser()
export class PostController {
  constructor(private postService: PostService) {}

  @Post()
  createPost(@CurrentUser() user: User, @Body() body: CreatePostReqDto) {
    return this.postService.createPost(user, body);
  }

  @Put(':id')
  updatePost(
    @CurrentUser() user: User,
    @Body() body: CreatePostReqDto,
    @Param('id') id: number,
  ) {
    return this.postService.updatePost(user, body, id);
  }

  @Get()
  getList(@CurrentUser() user: User, @Query() query: GetPostReqDto) {
    return this.postService.getList(user, query);
  }

  @Delete(':id')
  deletePost(@CurrentUser() user: User, @Param('id') id: number) {
    return this.postService.deletePost(user, id);
  }
}
