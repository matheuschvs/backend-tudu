import { inject, injectable } from "tsyringe";

import { AppError } from "../../../../errors/AppError";

import { Todo } from "../../entities/Todo";
import { ICategoriesRepository } from "../../../categories/repositories/ICategoriesRepository";
import { ITodosRepository } from "../../repositories/ITodosRepository";

interface IRequest {
  user_id: string;
  title: string;
  description: string;
  deadline: string;
  category_id: string;
}

@injectable()
export class CreateTodoUseCase {
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
    deadline,
    category_id
  }: IRequest): Promise<Todo> {
    title = title.toLowerCase()

    const category = await this.categoriesRepository.findById(
      user_id,
      category_id
    )

    if (!category) {
      throw new AppError('Category not found', 404)
    }

    const titleAlreadyExists = await this.todosRepository.findByTitle(
      user_id,
      title
    )

    if (titleAlreadyExists) {
      throw new AppError('Cannot create same todo twice', 409)
    }

    const timestampWithTimeZone = new Date(deadline).toISOString();

    const todo = await this.todosRepository.create({
      user_id,
      title,
      description,
      deadline: timestampWithTimeZone,
      category_id
    })

    return todo
  }
}
