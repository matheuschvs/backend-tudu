import { Repository } from "typeorm";

import { AppDataSource } from "../../../../database";

import { ICreateTodoTaskDTO } from "../../dtos/ICreateTodoTaskDTO";
import { IUpdateTodoTaskDTO } from "../../dtos/IUpdateTodoTaskDTO";
import { TodoTask } from "../../entities/TodoTask";
import { ITodoTasksRepository } from "../ITodoTasksRepository";

export class TodoTasksRepository implements ITodoTasksRepository {
  private repository: Repository<TodoTask>

  constructor() {
    this.repository = AppDataSource.getRepository(TodoTask)
  }

  async create({ todo_id, title }: ICreateTodoTaskDTO): Promise<TodoTask> {
    const createdTask = this.repository.create({
      status: 'WAITING',
      title,
      todo: { id: todo_id }
    })

    const task = await this.repository.save(createdTask)

    return task
  }

  async findByTitle(todo_id: string, title: string): Promise<TodoTask | null> {
    const task = await this.repository.findOneBy({
      todo: { id: todo_id },
      title
    })

    return task
  }

  async findById(todo_id: string, task_id: string): Promise<TodoTask | null> {
    const task = await this.repository.findOneBy({
      todo: { id: todo_id },
      id: task_id
    })

    return task
  }

  async update({
    title,
    status,
    todo_id,
    task_id
  }: IUpdateTodoTaskDTO): Promise<void> {
    await this.repository.update({
      id: task_id,
      todo: { id: todo_id }
    }, {
      title,
      status
    })
  }

  async delete(todo_id: string, task_id: string): Promise<void> {
    await this.repository.delete({
      todo: { id: todo_id },
      id: task_id
    })
  }
}
