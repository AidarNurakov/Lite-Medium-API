import { Injectable } from '@nestjs/common';
import { UserRepository } from '../database/repositories/user.repository';
import { CreateUserDto } from './dto/create-user.dto';
import { PaginationQueryDto } from '../post/dto/list-posts-query.dto';
import { ListResponseDto } from 'src/shared/dto/list-response.dto';
import { UserEntity } from '../database/entities/user.entity';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async findByEmail(email: string) {
    return this.userRepository.findOne({
      email,
    });
  }

  async createUser(dto: CreateUserDto) {
    return this.userRepository.create({ ...dto, createData: Date.now() });
  }

  async findById(id: number) {
    return this.userRepository.findById(id);
  }

  async list(query: PaginationQueryDto): Promise<ListResponseDto<UserEntity>> {
    const [items, count] = await this.userRepository.list(query);

    return {
      totalCount: count,
      items,
    };
  }
}
