import { inject, injectable } from "tsyringe";

import { AppError } from "../../../../errors/AppError";

import { ITodosRepository } from "../../repositories/ITodosRepository";

interface IRequest {
  user_id: string;
  todo_id: string;
}

@injectable()
export class DeleteTodoUseCase {
  constructor(
    @inject('TodosRepository')
    private todosRepository: ITodosRepository
  ) {}

  async execute({ user_id, todo_id }: IRequest): Promise<void> {
    const todo = await this.todosRepository.findById(todo_id)

    if (!todo) {
      throw new AppError('Invalid todo', 404)
    }

    if (!todo.users.some(user => user.id === user_id)) {
      throw new AppError('Forbidden', 403)
    }

    await this.todosRepository.delete(todo_id)
  }
}
