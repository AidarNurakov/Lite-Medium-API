import { Column, PrimaryGeneratedColumn } from 'typeorm';

export class BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({
    default: false,
  })
  isDeleted!: boolean;

  @Column({
    type: 'timestamptz',
    default: new Date(),
  })
  createDate!: Date;

  @Column({
    type: 'timestamptz',
    default: new Date(),
  })
  updateDate!: Date;
}
