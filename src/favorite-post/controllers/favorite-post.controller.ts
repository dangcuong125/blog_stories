import { Controller, Param, Put } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { User } from '../../auth/entities/user.entity';
import {
  AuthenticateUser,
  CurrentUser,
} from '../../common/decorators/auth.decorator';
import { FavoritePostService } from '../services/favorite-post.service';

@Controller('favorite-post')
@AuthenticateUser()
@ApiTags('Favorite Post Controller')
export class FavoritePostController {
  constructor(private favoritePostService: FavoritePostService) {}

  @Put(':id')
  toggleFavoritePost(@CurrentUser() user: User, @Param('id') id: number) {
    return this.favoritePostService.toggleFavoritePost(user, id);
  }
}
