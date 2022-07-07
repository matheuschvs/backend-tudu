import { Column, Entity, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm'

import { Category } from '../../categories/entities/Category';
import { User } from '../../users/entities/User';
import { Comment } from './Comment';
import { File } from './File';
import { TodoTask } from './TodoTask';

@Entity('todos')
export class Todo {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: '30', nullable: false })
  status: string;

  @Column({ length: '30', nullable: false })
  title: string;

  @Column({ length: '256', nullable: true })
  description: string;

  @Column({ type: 'timestamp with time zone', nullable: false })
  deadline: Date;

  @ManyToOne(
    () => Category,
    category => category.todos,
    { onDelete: 'CASCADE', eager: true, nullable: false }
  )
  category: Category;

  @ManyToMany(
    () => User,
    user => user.todos,
    { onDelete: 'CASCADE', eager: true, nullable: false }
  )
  users: User[];

  @OneToMany(() => Comment, comment => comment.todo, { eager: true })
  comments: Comment[]

  @OneToMany(() => TodoTask, task => task.todo, { eager: true })
  tasks: TodoTask[];

  @OneToMany(() => File, file => file.todo, { eager: true })
  files: File[];
}
