import { inject, injectable } from "tsyringe";

import { AppError } from "../../../../errors/AppError";

import { IFilesRepository } from "../../repositories/IFilesRepository";
import { ITodosRepository } from "../../repositories/ITodosRepository";

interface IRequest {
  user_id: string;
  todo_id: string;
  file: string;
}

@injectable()
export class ImportFileUseCase {
  constructor(
    @inject('FilesRepository')
    private filesRepository: IFilesRepository,
    @inject('TodosRepository')
    private todosRepository: ITodosRepository
  ) {}

  async execute({ user_id, todo_id, file }: IRequest): Promise<void> {
    const todo = await this.todosRepository.findById(todo_id)

    if (!todo) {
      throw new AppError('Invalid todo', 404)
    }

    if (!todo.users.some(user => user.id === user_id)) {
      throw new AppError('Forbidden', 403)
    }

    await this.filesRepository.insert({ todo_id, file })
  }
}
