import { Entity, Column, OneToMany } from 'typeorm';
import { BaseEntity } from './base.entity';
import { Point } from './point.entity';

@Entity({ name: 'user' })
export class User extends BaseEntity {

  @Column({type: 'varchar', length: 300})
  firstName: string;

  @Column({type: 'varchar', length: 300})
  lastName: string;

  @Column({type: 'varchar', length: 300, unique: true})
  email: string;

  @Column({type: 'varchar', length: 300, default: true})
  role: string = 'user';

  @OneToMany(() => Point, (point: Point) => point.user)
  points: Point[];
}