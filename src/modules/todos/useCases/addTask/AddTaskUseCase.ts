import { inject, injectable } from "tsyringe";

import { AppError } from "../../../../errors/AppError";
import { TodoTask } from "../../entities/TodoTask";

import { ITodosRepository } from "../../repositories/ITodosRepository";
import { ITodoTasksRepository } from "../../repositories/ITodoTasksRepository";

interface IRequest {
  user_id: string;
  todo_id: string;
  title: string;
}

@injectable()
export class AddTaskUseCase {
  constructor(
    @inject('TodoTasksRepository')
    private todoTasksRepository: ITodoTasksRepository,
    @inject('TodosRepository')
    private TodosRepository: ITodosRepository
  ) {}

  async execute({ user_id, todo_id, title }: IRequest): Promise<TodoTask> {
    title = title.toLowerCase()

    const todo = await this.TodosRepository.findById(todo_id)

    if (!todo) {
      throw new AppError('Invalid todo', 404)
    }

    if (!todo.users.some(user => user.id === user_id)) {
      throw new AppError('Forbidden', 403)
    }

    if (todo.tasks.some(task => task.title === title)) {
      throw new AppError('This title is already taken', 409)
    }

    const task = await this.todoTasksRepository.create({ todo_id, title })

    return task
  }
}
