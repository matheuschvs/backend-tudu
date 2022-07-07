import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm'

import { Todo } from '../../todos/entities/Todo';
import { User } from '../../users/entities/User';

@Entity('categories')
export class Category {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: '30', nullable: false })
  title: string;

  @Column({ length: '30', nullable: false })
  color: string;

  @ManyToOne(
    () => User,
    user => user.categories,
    { onDelete: 'CASCADE', nullable: false }
  )
  user: User

  @OneToMany(() => Todo, todo => todo.category)
  todos: Todo[]
}
