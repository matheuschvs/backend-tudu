import { inject, injectable } from "tsyringe";

import { AppError } from "../../../../errors/AppError";
import { deleteFile } from "../../../../utils/file";

import { IFilesRepository } from "../../repositories/IFilesRepository";
import { ITodosRepository } from "../../repositories/ITodosRepository";

interface IRequest {
  user_id: string;
  todo_id: string;
  file_id: string;
}

@injectable()
export class RemoveFileUseCase {
  constructor(
    @inject('FilesRepository')
    private filesRepository: IFilesRepository,
    @inject('TodosRepository')
    private todosRepository: ITodosRepository
  ) {}

  async execute({ user_id, todo_id, file_id }: IRequest): Promise<void> {
    const todo = await this.todosRepository.findById(todo_id)

    if (!todo) {
      throw new AppError('Invalid todo', 404)
    }

    if (!todo.users.some(user => user.id === user_id)) {
      throw new AppError('Forbidden', 403)
    }

    const file = await this.filesRepository.findById(file_id)

    if (!file) {
      throw new AppError('File not found', 404)
    }

    await deleteFile(`./tmp/${file.file}`)

    await this.filesRepository.delete(file_id)
  }
}
