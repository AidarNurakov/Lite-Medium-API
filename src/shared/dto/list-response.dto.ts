import { ApiProperty } from '@nestjs/swagger';

export class ListResponseDto<TData> {
  @ApiProperty({
    type: Array<TData>,
  })
  items: TData[];

  @ApiProperty()
  totalCount: number;
}
