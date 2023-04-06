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

  @ManyToOne(() => UserEntity, (author) => author.posts)
  author: UserEntity;
}
