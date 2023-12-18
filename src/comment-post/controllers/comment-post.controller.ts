import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { User } from '../../auth/entities/user.entity';
import {
  AuthenticateUser,
  CurrentUser,
} from '../../common/decorators/auth.decorator';
import { CreateCommentPostReqDto } from '../dtos/req/create-comment.req.dto';
import { GetListCommentPostReqDto } from '../dtos/req/get-comment.req.dto';
import { CommentPostService } from '../services/comment-post.service';

@Controller('comment-post')
@ApiTags('Comment Post Controller')
@AuthenticateUser()
export class CommentPostController {
  constructor(private commentPostService: CommentPostService) {}

  @Post()
  createComment(
    @CurrentUser() user: User,
    @Body() body: CreateCommentPostReqDto,
  ) {
    return this.commentPostService.createComment(user, body);
  }

  @Get()
  getListComments(@Query() query: GetListCommentPostReqDto) {
    return this.commentPostService.getListComments(query);
  }
}
