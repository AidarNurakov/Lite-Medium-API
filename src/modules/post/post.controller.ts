import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { routesConfig } from '../../configs';
import {
  ApiBearerAuth,
  ApiBody,
  ApiParam,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { PostService } from './post.service';
import { CreatePostDto } from './dto/create-post.dto';
import { Actor } from '../../shared/decorators/actor.decorator';
import { UserEntity } from '../database/entities/user.entity';
import { PostEntity } from '../database/entities/post.entity';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { PaginationQueryDto } from './dto/list-posts-query.dto';
import { ListResponseDto } from '../../shared/dto/list-response.dto';
import { UpdatePostDto } from './dto/update-post.dto';

@ApiBearerAuth()
@ApiTags('Posts [User]')
@UseGuards(JwtAuthGuard)
@Controller(routesConfig.post.root)
@UsePipes(new ValidationPipe({ transform: true }))
export class PostController {
  constructor(private readonly postService: PostService) {}

  @ApiBody({
    type: () => CreatePostDto,
  })
  @ApiResponse({
    type: () => PostEntity,
  })
  @Post(routesConfig.post.create)
  async create(
    @Body() dto: CreatePostDto,
    @Actor() user: UserEntity,
  ): Promise<PostEntity> {
    return await this.postService.create(dto, user);
  }

  @ApiParam({
    name: 'id',
    type: Number,
  })
  @Get(routesConfig.post.findById)
  async findById(
    @Param('id', new ParseIntPipe()) id: number,
    @Actor() user: UserEntity,
  ) {
    return this.postService.findById(id, user);
  }

  @ApiQuery({
    type: String,
    name: 'title',
    required: false,
  })
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
  @Get(routesConfig.post.list)
  async list(
    @Query() query: PaginationQueryDto,
    @Actor() user: UserEntity,
  ): Promise<ListResponseDto<PostEntity>> {
    return this.postService.list(query, user);
  }

  @ApiBody({
    type: () => UpdatePostDto,
  })
  @ApiResponse({
    type: () => PostEntity,
  })
  @Put(routesConfig.post.updateById)
  async updateById(
    @Param('id') id: number,
    @Body() dto: UpdatePostDto,
    @Actor() user: UserEntity,
  ): Promise<PostEntity> {
    return this.postService.updateById(id, dto, user);
  }

  @ApiResponse({
    type: () => PostEntity,
  })
  @Put(routesConfig.post.incrementClaps)
  async incrementClaps(
    @Param('id') id: number,
    @Actor() user: UserEntity,
  ): Promise<PostEntity> {
    return this.postService.inrementClaps(id, user);
  }

  @ApiResponse({
    type: () => PostEntity,
  })
  @Delete(routesConfig.post.deleteById)
  async deleteById(
    @Param('id') id: number,
    @Actor() user: UserEntity,
  ): Promise<PostEntity> {
    return this.postService.deleteById(id, user);
  }
}
