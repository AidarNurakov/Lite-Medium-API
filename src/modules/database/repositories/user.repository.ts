import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '../entities/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from '../../user/dto/create-user.dto';

@Injectable()
export class UserRepository {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async create(userData: CreateUserDto): Promise<UserEntity | UserEntity[]> {
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
}
