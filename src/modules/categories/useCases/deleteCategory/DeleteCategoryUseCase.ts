import { inject, injectable } from "tsyringe";

import { AppError } from "../../../../errors/AppError";

import { ICategoriesRepository } from "../../repositories/ICategoriesRepository";

interface IRequest {
  user_id: string;
  category_id: string;
}

@injectable()
export class DeleteCategoryUseCase {
  constructor(
    @inject('CategoriesRepository')
    private categoriesRepository: ICategoriesRepository
  ) {}

  async execute({ user_id, category_id }: IRequest): Promise<void> {
    const category = await this.categoriesRepository.findById(
      user_id,
      category_id
    )

    if (!category) {
      throw new AppError('Invalid todo', 404)
    }

    await this.categoriesRepository.delete(category_id)
  }
}
