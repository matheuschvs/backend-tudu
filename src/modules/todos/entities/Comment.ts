import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'

import { User } from '../../users/entities/User';
import { Todo } from './Todo';

@Entity('comments')
export class Comment {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: '128', nullable: false })
  comment: string;

  @ManyToOne(
    () => User,
    user => user.comments,
    { onDelete: 'CASCADE', eager: true, nullable: false }
  )
  user: User;

  @ManyToOne(
    () => Todo,
    todo => todo.comments,
    { onDelete: 'CASCADE', nullable: false }
  )
  todo: Todo;
}
