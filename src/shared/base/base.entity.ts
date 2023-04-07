import { Column, PrimaryGeneratedColumn } from 'typeorm';

export class BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({
    default: false,
  })
  isDeleted!: boolean;

  @Column({
    type: 'integer',
    default: Date.now(),
  })
  createDate!: Date;

  @Column({
    type: 'integer',
    default: Date.now(),
  })
  updateDate!: Date;
}
