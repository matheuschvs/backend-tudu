import { inject, injectable } from 'tsyringe'

import { AppError } from '../../../../errors/AppError';

import { Category } from "../../entities/Category";
import { ICategoriesRepository } from "../../repositories/ICategoriesRepository";

interface IRequest {
  user_id: string;
  title: string;
  color: string;
}

@injectable()
export class CreateCategoryUseCase {
  constructor(
    @inject('CategoriesRepository')
    private categoriesRepository: ICategoriesRepository
  ) {}

  async execute({ user_id, title, color }: IRequest): Promise<Category> {
    title = title.toLowerCase()
    color = color.toLowerCase()

    const categoryAlreadyExists = await this.categoriesRepository.findByTitle(user_id, title)

    if (categoryAlreadyExists) {
      throw new AppError('Category already exists', 409)
    }

    const categoryColorAlreadyInUse = await this.categoriesRepository.findByColor(user_id, color)

    if (categoryColorAlreadyInUse) {
      throw new AppError('Category color already in use', 409)
    }

    const category = await this.categoriesRepository.create({ user_id, title, color })

    return category
  }
}
