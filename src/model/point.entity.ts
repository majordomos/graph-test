import { Entity, Column, ManyToOne } from 'typeorm';
import { BaseEntity } from './base.entity';
import { User } from './user.entity';

@Entity({ name: 'point' })
export class Point extends BaseEntity {

  @Column({type: 'integer'})
  x_value: number;

  @Column({type: 'integer'})
  y_value: number;

  @ManyToOne(() => User, (user: User) => user.points)
  user: User;
}