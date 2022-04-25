import { Entity, Column, OneToMany, DeleteDateColumn, PrimaryGeneratedColumn } from 'typeorm';
import { Point } from '../point/point.entity';
import { Exclude } from 'class-transformer';

@Entity({ name: 'users' })
export class User{

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({type: 'varchar', length: 300})
  google_id: string;

  @Column({type: 'varchar', length: 300})
  first_name: string;

  @Column({type: 'varchar', length: 300})
  last_name: string;

  @Column({type: 'varchar', length: 300, unique: true})
  email: string;

  @Column({type: 'varchar', length: 300})
  picture_url: string;

  @Column({type: 'varchar', length: 300, default: 'employee'})
  user_role: string;

  @OneToMany(() => Point, (point: Point) => point.user)
  points: Point[];

  @DeleteDateColumn({type: 'timestamptz'})
  deleted_at?: Date;
}