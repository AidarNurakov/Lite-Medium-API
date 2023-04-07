import { BeforeInsert, Column, Entity, OneToMany } from 'typeorm';
import { BaseEntity } from '../../../shared/base/base.entity';
import { PostEntity } from './post.entity';
import { encryptPassword } from 'src/shared/utils';

@Entity('users')
export class UserEntity extends BaseEntity {
  @Column({
    type: 'varchar',
  })
  email: string;

  @Column({
    type: 'varchar',
  })
  password: string;

  @Column({ type: 'integer', default: 0 })
  rate: number;

  @OneToMany(() => PostEntity, (post) => post.author)
  posts: PostEntity[];

  @BeforeInsert()
  async hashPassword() {
    this.password = await encryptPassword(this.password);
  }
}
