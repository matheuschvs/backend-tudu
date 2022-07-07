import { inject, injectable } from "tsyringe";

import { Todo } from "../../entities/Todo";
import { ITodosRepository } from "../../repositories/ITodosRepository";

interface IRequest {
  user_id: string;
  status: 'WAITING' | 'DONE' | undefined;
  limit: number;
  offset: number;
}

@injectable()
export class ListTodosUseCase {
  constructor(
    @inject('TodosRepository')
    private todosRepository: ITodosRepository
  ) {}

  async execute({ user_id, status, limit, offset }: IRequest): Promise<Todo[]> {
    const todos = await this.todosRepository.list({
      user_id,
      status,
      limit,
      offset
    })

    return todos
  }
}
