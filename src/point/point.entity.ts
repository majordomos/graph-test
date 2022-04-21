import { Entity, Column, ManyToOne, CreateDateColumn, PrimaryGeneratedColumn } from 'typeorm';
import { User } from '../user/user.entity';

@Entity({ name: 'points' })
export class Point{

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({type: 'integer'})
  x_value: number;

  @Column({type: 'integer'})
  y_value: number;

  @Column({type: 'real'})
  result_value: number;

  @CreateDateColumn({type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  createDateTime: Date;

  @ManyToOne(() => User, (user: User) => user.points)
  user: User;
}