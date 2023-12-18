import { Module } from '@nestjs/common';
import { TypeOrmCustomModule } from '../common/typeorm-custom';
import { FavoritePostController } from './controllers/favorite-post.controller';
import { FavoritePostRepository } from './repositories/favorite-post.repository';
import { FavoritePostService } from './services/favorite-post.service';

@Module({
  imports: [TypeOrmCustomModule.forFeature([FavoritePostRepository])],
  controllers: [FavoritePostController],
  providers: [FavoritePostService],
})
export class FavoritePostModule {}
