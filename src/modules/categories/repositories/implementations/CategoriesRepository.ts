import { Repository } from 'typeorm';

import { AppDataSource } from '../../../../database';
import { IUsersRepository } from '../../../users/repositories/IUsersRepository';
import { Category } from '../../entities/Category'
import { ICategoriesRepository, ICreateCategoryDTO } from '../ICategoriesRepository';

export class CategoriesRepository implements ICategoriesRepository {
  private repository: Repository<Category>

  constructor() {
    this.repository = AppDataSource.getRepository(Category)
  }

  async create({ user_id, title, color }: ICreateCategoryDTO): Promise<Category> {
    const createdCategory = this.repository.create({
      user: { id: user_id },
      title,
      color
    })

    const category = await this.repository.save(createdCategory)

    return category
  }

  async listById(id: string): Promise<Category[]> {
    return await this.repository.findBy({ user: { id } })
  }

  async findByTitle(user_id: string, title: string): Promise<Category | null> {
    const category = await this.repository.findOneBy({
      user: { id: user_id },
      title
    })

    return category
  }

  async findByColor(user_id: string, color: string): Promise<Category | null> {
    const category = await this.repository.findOneBy({
      user: { id: user_id },
      color
    })

    return category
  }

  async findById(user_id: string, category_id: string): Promise<Category | null> {
    const category = await this.repository.findOneBy({
      user: { id: user_id },
      id: category_id
    })

    return category
  }

  async delete(category_id: string): Promise<void> {
    await this.repository.delete({ id: category_id })
  }
}
