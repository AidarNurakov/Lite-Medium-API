import { Injectable } from '@nestjs/common';
import { UserRepository } from '../database/repositories/user.repository';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async findByEmail(email: string) {
    return this.userRepository.findOne({
      email,
    });
  }

  async createUser(dto: CreateUserDto) {
    return this.userRepository.create(dto);
  }

  async findById(id: number) {
    return this.userRepository.findById(id);
  }
}
