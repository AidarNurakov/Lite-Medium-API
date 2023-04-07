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
    const readingTime = await this.calculateReadingTime(dto.content);
    return (await this.postRepository.create({
      author: user,
      readingTime,
      ...dto,
    })) as PostEntity;
  }

  async findById(id: number, author: UserEntity) {
    const post = await this.postRepository.findOne({
      id,
      author,
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
    author: UserEntity,
  ): Promise<PostEntity> {
    const post = await this.postRepository.findOne({ id, author });

    if (!post) {
      throw new NotFoundException('Not found post');
    }

    const updateData = { ...post, ...dto, updateDate: Date.now() };

    await this.postRepository.updateById(id, updateData);

    return this.postRepository.findById(id);
  }

  async inrementClaps(id: number) {
    const post = await this.postRepository.findOne({ id });

    if (!post) {
      throw new NotFoundException('Not found post');
    }
    const updateData = { ...post, claps: ++post.claps, updateDate: Date.now() };

    await this.postRepository.updateById(id, updateData);

    return this.postRepository.findById(id);
  }

  async deleteById(id: number, author: UserEntity) {
    const post = await this.postRepository.findOne({ id, author });

    if (!post) {
      throw new NotFoundException('Not found post');
    }

    await this.postRepository.softRemove(id);

    return this.postRepository.findById(post.id);
  }

  private async calculateReadingTime(article: string) {
    const wordsPerMinute = 275;
    const totalWords = article.split(/\s+/g).length;
    const estimatedReadingTime = Math.ceil(totalWords / wordsPerMinute);

    return estimatedReadingTime;
  }
}
