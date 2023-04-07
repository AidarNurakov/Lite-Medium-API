import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PostEntity } from '../entities/post.entity';
import { Repository } from 'typeorm';
import { PaginationQueryDto } from '../../post/dto/list-posts-query.dto';
import { UserEntity } from '../entities/user.entity';
import { getSkipPaginationValue } from '../../../shared/utils';

@Injectable()
export class PostRepository {
  constructor(
    @InjectRepository(PostEntity)
    private readonly postRepository: Repository<PostEntity>,
  ) {}

  async create(postData): Promise<PostEntity | PostEntity[]> {
    const post = this.postRepository.create(postData);

    return this.postRepository.save(post);
  }

  async findById(id: number): Promise<PostEntity | null> {
    return this.postRepository.findOne({
      where: {
        id,
      },
    });
  }

  async findOne(query) {
    return this.postRepository.findOne({
      where: query,
    });
  }

  async list({ page = 1, limit = 20 }: PaginationQueryDto, user: UserEntity) {
    const queryRunner = this.postRepository
      .createQueryBuilder('post')
      .leftJoinAndSelect('post.author', 'author')
      .where('post.isDeleted = false')
      .andWhere('author.id = :authorId', { authorId: user.id });

    return queryRunner
      .skip(getSkipPaginationValue(page, limit))
      .take(limit)
      .getManyAndCount();
  }

  async updateById(id: number, updateData) {
    return this.postRepository.update({ id }, updateData);
  }

  async softRemove(id: number) {
    return this.postRepository.update(
      { id },
      {
        isDeleted: true,
      },
    );
  }
}
