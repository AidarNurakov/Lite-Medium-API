import { IsBoolean, IsNumber, IsOptional, IsString } from 'class-validator';
import { Transform } from 'class-transformer';

export class ListPostsQueryDto {
  @IsOptional()
  @IsString()
  title: string;

  @IsOptional()
  @IsBoolean()
  @Transform(({ value }) => value && value === 'true')
  completed: boolean;

  @IsOptional()
  @IsNumber()
  @Transform(({ value }) => value && +value)
  page: number;

  @IsOptional()
  @IsNumber()
  @Transform(({ value }) => value && +value)
  limit: number;
}
