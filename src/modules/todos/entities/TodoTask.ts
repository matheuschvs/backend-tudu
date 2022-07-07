import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'

import { Todo } from './Todo';

@Entity('todo_tasks')
export class TodoTask {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: '30', nullable: false })
  status: string;

  @Column({ length: '30', nullable: false })
  title: string;

  @ManyToOne(
    () => Todo,
    todo => todo.tasks,
    { onDelete: 'CASCADE', nullable: false }
  )
  todo: Todo;
}
