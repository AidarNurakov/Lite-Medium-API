import { Injectable, NotFoundException } from '@nestjs/common';
import { UserEntity } from '../database/entities/user.entity';
import { CreatePostDto } from './dto/create-post.dto';
import { PostRepository } from '../database/repositories/post.repository';
import { PostEntity } from '../database/entities/post.entity';
import { ListResponseDto } from '../../shared/dto/list-response.dto';
import { UpdatePostDto } from './dto/update-post.dto';

@Injectable()
export class PostService {
  constructor(private readonly postRepository: PostRepository) {}

  async create(dto: CreatePostDto, user: UserEntity) {
    return (await this.postRepository.create({
      ...dto,
      user,
    })) as PostEntity;
  }

  async findById(id: number, user: UserEntity) {
    const post = await this.postRepository.findOne({
      id,
      user,
    });

    if (!post) {
      throw new NotFoundException('Not found post');
    }

    return post;
  }

  async list(query, user): Promise<ListResponseDto<PostEntity>> {
    const [items, count] = await this.postRepository.list(query, user);

    return {
      totalCount: count,
      items,
    };
  }

  async updateById(
    id: number,
    dto: UpdatePostDto,
    user: UserEntity,
  ): Promise<PostEntity> {
    const post = await this.postRepository.findOne({ id, user });

    if (!post) {
      throw new NotFoundException('Not found post');
    }

    const updateData = { ...post, ...dto, updateDate: new Date() };

    await this.postRepository.updateById(id, updateData);

    return this.postRepository.findById(id);
  }

  async deleteById(id: number, user: UserEntity) {
    const post = await this.postRepository.findOne({ id, user });

    if (!post) {
      throw new NotFoundException('Not found post');
    }

    await this.postRepository.softRemove(id);

    return this.postRepository.findById(post.id);
  }
}
