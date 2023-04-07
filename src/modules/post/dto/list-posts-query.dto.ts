import { IsNumber, IsOptional } from 'class-validator';
import { Transform } from 'class-transformer';

export class PaginationQueryDto {
  @IsOptional()
  @IsNumber()
  @Transform(({ value }) => value && +value)
  page: number;

  @IsOptional()
  @IsNumber()
  @Transform(({ value }) => value && +value)
  limit: number;
}
