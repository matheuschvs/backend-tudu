import { Column, Entity, JoinTable, ManyToMany, OneToMany, OneToOne, PrimaryGeneratedColumn } from 'typeorm'

import { Category } from '../../categories/entities/Category';
import { Comment } from '../../todos/entities/Comment';
import { Todo } from '../../todos/entities/Todo';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: '128', nullable: false })
  name: string;

  @Column({ length: '128', unique: true, nullable: false })
  email: string;

  @Column({ length: '256', nullable: false })
  password: string;

  @OneToMany(() => Category, category => category.user)
  categories: Category[]

  @ManyToMany(() => Todo, todo => todo.users)
  @JoinTable()
  todos: Todo[];

  @OneToOne(() => Comment, comment => comment.user)
  comments: Comment[]
}
