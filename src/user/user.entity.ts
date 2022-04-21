import { Entity, Column, OneToMany, DeleteDateColumn, PrimaryGeneratedColumn } from 'typeorm';
import { Point } from '../point/point.entity';
import { Exclude } from 'class-transformer';

@Entity({ name: 'users' })
export class User{

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({type: 'varchar', length: 300})
  googleId: string;

  @Column({type: 'varchar', length: 300})
  firstName: string;

  @Column({type: 'varchar', length: 300})
  lastName: string;

  @Column({type: 'varchar', length: 300, unique: true})
  email: string;

  @Column({type: 'varchar', length: 300})
  pictureUrl: string;

  @Column({type: 'varchar', length: 300, default: true})
  user_role: string = 'employee';

  @OneToMany(() => Point, (point: Point) => point.user)
  points: Point[];

  @DeleteDateColumn({type: 'timestamptz'})
  deletedAt?: Date;
}