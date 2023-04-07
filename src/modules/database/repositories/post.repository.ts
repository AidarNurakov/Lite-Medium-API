import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PostEntity } from '../entities/post.entity';
import { Repository } from 'typeorm';
import { ListPostsQueryDto } from '../../post/dto/list-posts-query.dto';
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

  async list(
    { page = 1, limit = 20, ...query }: ListPostsQueryDto,
    user: UserEntity,
  ) {
    const queryRunner = this.postRepository
      .createQueryBuilder('post')
      .leftJoinAndSelect('post.user', 'user')
      .where('post.isDeleted = false')
      .andWhere('user.id = :userId', { userId: user.id });

    if (query.title) {
      queryRunner.andWhere('LOWER(post.title) like :name', {
        name: `%${query.title}%`,
      });
    }

    if (query.completed) {
      queryRunner.andWhere('post.isCompleted = :isCompleted', {
        isCompleted: query.completed,
      });
    }

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
