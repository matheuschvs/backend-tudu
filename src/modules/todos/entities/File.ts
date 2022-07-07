import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'

import { Todo } from './Todo';

@Entity('files')
export class File {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: '256', nullable: false })
  file: string;

  @ManyToOne(
    () => Todo,
    todo => todo.files,
    { onDelete: 'CASCADE', nullable: false }
  )
  todo: Todo;
}
