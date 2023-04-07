import { Column, Entity, ManyToOne } from 'typeorm';
import { BaseEntity } from '../../../shared/base/base.entity';
import { UserEntity } from './user.entity';

@Entity('posts')
export class PostEntity extends BaseEntity {
  @Column({
    type: 'varchar',
  })
  title: string;

  @Column({
    type: 'text',
  })
  content: string;

  @Column({ type: 'integer' })
  readingTime: number;

  @Column({ type: 'integer', default: 0 })
  claps: number;

  @ManyToOne(() => UserEntity, (author) => author.posts)
  author: UserEntity;
}
