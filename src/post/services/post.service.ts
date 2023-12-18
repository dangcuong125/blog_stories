import { Injectable } from '@nestjs/common';
import { In } from 'typeorm';
import { Transactional } from 'typeorm-transactional';
import { User } from '../../auth/entities/user.entity';
import { CommentPostRepository } from '../../comment-post/repositories/comment-post.repository';
import { BadRequestExc } from '../../common/exceptions/custom.exception';
import { paginate } from '../../common/typeorm-custom/paginate';
import { FavoritePostRepository } from '../../favorite-post/repositories/favorite-post.repository';
import { FileRepository } from '../../file/repositories/file.repository';
import { CreatePostReqDto } from '../dtos/req/create-post.req.dto';
import { GetPostReqDto } from '../dtos/req/get-post.req.dto';
import { PostRepository } from '../repositories/post.repository';
import { PostImagesRepository } from '../repositories/psot-images.repository';

@Injectable()
export class PostService {
  constructor(
    private postRepository: PostRepository,
    private fileRepository: FileRepository,
    private commentPostRepository: CommentPostRepository,
    private favoritePostRepository: FavoritePostRepository,
    private postImagesRepository: PostImagesRepository,
  ) {}

  @Transactional()
  async createPost(user: User, body: CreatePostReqDto) {
    const { content, images } = body;

    const files = await this.fileRepository.findBy({
      id: In(images),
    });

    if (files.length !== images.length) {
      throw new BadRequestExc({
        message: 'post.imagesInvalid',
      });
    }

    const post = await this.postRepository.save({
      content,
      userId: user.id,
    });

    return this.postImagesRepository.insert(
      images.map((image) =>
        this.postImagesRepository.create({
          imageId: image,
          postId: post.id,
        }),
      ),
    );
  }

  async updatePost(user: User, body: CreatePostReqDto, id: number) {
    const { content, images } = body;
    const postExist = await this.postRepository.findOneBy({
      id: id,
      userId: user.id,
    });

    if (!postExist) {
      throw new BadRequestExc({ message: 'post.postNotFound' });
    }

    const files = await this.fileRepository.findBy({
      id: In(images),
    });

    if (files.length !== images.length) {
      throw new BadRequestExc({
        message: 'post.imagesInvalid',
      });
    }

    await this.postImagesRepository.insert(
      images.map((image) =>
        this.postImagesRepository.create({
          imageId: image,
          postId: id,
        }),
      ),
    );

    return this.postRepository.save({
      ...postExist,
      content,
    });
  }

  async getList(user: User, query: GetPostReqDto) {
    const { limit, page } = query;
    const queryBuilder = this.postRepository
      .createQueryBuilder('post')
      .leftJoinAndSelect('post.postImages', 'postImages')
      .leftJoinAndSelect('postImages.image', 'image')
      .leftJoinAndSelect('post.user', 'user')
      .leftJoinAndSelect('post.favoritePosts', 'favoritePosts')
      .leftJoinAndSelect('favoritePosts.user', 'userFavorite')
      .orderBy('post.createdAt', 'DESC');

    const { items, meta } = await paginate(queryBuilder, { limit, page });

    for (let i = 0; i < items.length; i++) {
      const [totalComments, favoritePost] = await Promise.all([
        this.commentPostRepository.countBy({
          postId: items[i].id,
        }),
        this.favoritePostRepository.findOneBy({
          userId: user.id,
          postId: items[i].id,
        }),
      ]);

      items[i].totalComments = totalComments;
      items[i].isLike = !!favoritePost;
    }

    return {
      items,
      meta,
    };
  }

  async deletePost(user: User, postId: number) {
    const postExist = await this.postRepository.findOneBy({
      id: postId,
      userId: user.id,
    });

    if (!postExist) {
      throw new BadRequestExc({ message: 'post.postNotFound' });
    }

    return this.postRepository.softDelete(postExist);
  }
}
