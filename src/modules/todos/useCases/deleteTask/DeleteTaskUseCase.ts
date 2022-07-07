import { inject, injectable } from "tsyringe";

import { AppError } from "../../../../errors/AppError";

import { ITodosRepository } from "../../repositories/ITodosRepository";
import { ITodoTasksRepository } from "../../repositories/ITodoTasksRepository";

interface IRequest {
  user_id: string;
  todo_id: string;
  task_id: string;
}

@injectable()
export class DeleteTaskUseCase {
  constructor(
    @inject('TodosRepository')
    private todosRepository: ITodosRepository,
    @inject('TodoTasksRepository')
    private todoTasksRepository: ITodoTasksRepository
  ) {}

  async execute({ user_id, todo_id, task_id }: IRequest): Promise<void> {
    const todo = await this.todosRepository.findById(todo_id)

    if (!todo) {
      throw new AppError('Invalid todo', 404)
    }

    if (!todo.users.some(user => user.id === user_id)) {
      throw new AppError('Forbidden', 403)
    }

    const task = await this.todoTasksRepository.findById(todo_id, task_id)

    if (!task) {
      throw new AppError('Task not found', 404)
    }

    await this.todoTasksRepository.delete(todo_id, task_id)
  }
}
