import { inject, injectable } from "tsyringe";

import { AppError } from "../../../../errors/AppError";
import { ICategoriesRepository } from "../../../categories/repositories/ICategoriesRepository";

import { ITodosRepository } from "../../repositories/ITodosRepository";

interface IRequest {
  user_id: string;
  title: string;
  description: string;
  status: 'WAITING' | 'DONE' | undefined;
  deadline: string;
  category_id: string;
  todo_id: string;
}

@injectable()
export class UpdateTodoUseCase {
  constructor(
    @inject('TodosRepository')
    private todosRepository: ITodosRepository,
    @inject('CategoriesRepository')
    private categoriesRepository: ICategoriesRepository
  ) {}

  async execute({
    user_id,
    title,
    description,
    status,
    deadline,
    category_id,
    todo_id
  }: IRequest): Promise<void> {
    if (title) {
      title = title.toLowerCase()
    }

    const todo = await this.todosRepository.findById(todo_id)

    if (!todo) {
      throw new AppError('Invalid todo', 404)
    }

    if (!todo.users.some(user => user.id === user_id)) {
      throw new AppError('Forbidden', 403)
    }

    if (title) {
      const titleAlreadyExists = await this.todosRepository.findByTitle(
        user_id,
        title
      )

      if (titleAlreadyExists) {
        throw new AppError('Cannot create same todo twice', 409)
      }
    }

    if (category_id) {
      const categoryExists = await this.categoriesRepository.findById(
        user_id,
        category_id
      )

      if (!categoryExists) {
        throw new AppError('Invalid category', 404)
      }
    }

    let timestampWithTimeZone

    if (deadline) {
      timestampWithTimeZone = new Date(deadline).toISOString()
    }

    await this.todosRepository.update({
      title: title || todo.title,
      description: description || todo.description,
      status: status || <'WAITING' | 'DONE'>todo.status,
      deadline: timestampWithTimeZone || todo.deadline,
      category_id: category_id || todo.category.id,
      todo_id
    })
  }
}
