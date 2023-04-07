import { Controller, Get, Query } from '@nestjs/common';
import { routesConfig } from 'src/configs';
import { UserService } from './user.service';
import { ApiQuery, ApiResponse } from '@nestjs/swagger';
import { ListResponseDto } from 'src/shared/dto/list-response.dto';
import { UserEntity } from '../database/entities/user.entity';
import { PaginationQueryDto } from '../post/dto/list-posts-query.dto';

@Controller(routesConfig.user.root)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiQuery({
    type: String,
    name: 'page',
    required: false,
  })
  @ApiQuery({
    type: String,
    name: 'limit',
    required: false,
  })
  @ApiResponse({
    type: () => ListResponseDto,
  })
  @Get(routesConfig.user.list)
  async list(
    @Query() query: PaginationQueryDto,
  ): Promise<ListResponseDto<UserEntity>> {
    return this.userService.list(query);
  }
}
