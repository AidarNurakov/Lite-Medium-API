import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '../entities/user.entity';
import { Repository } from 'typeorm';
import { PaginationQueryDto } from 'src/modules/post/dto/list-posts-query.dto';
import { getSkipPaginationValue } from 'src/shared/utils';

@Injectable()
export class UserRepository {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async create(userData): Promise<UserEntity | UserEntity[]> {
    const user = this.userRepository.create(userData);

    return this.userRepository.save(user);
  }

  async findById(id: number): Promise<UserEntity | null> {
    return this.userRepository.findOne({
      where: {
        id,
      },
    });
  }

  async findOne(query): Promise<UserEntity | null> {
    return this.userRepository.findOne({
      where: query,
    });
  }

  async list({ page = 1, limit = 20 }: PaginationQueryDto) {
    const queryRunner = this.userRepository
      .createQueryBuilder('user')
      .where('user.isDeleted = false');

    return queryRunner
      .skip(getSkipPaginationValue(page, limit))
      .take(limit)
      .getManyAndCount();
  }

  async updateRate(userId: number) {
    await this.userRepository
      .createQueryBuilder('user')
      .update()
      .set({ rate: () => 'rate + 1' })
      .where('id = :userId', { userId })
      .execute();
  }
}
