import { Category } from "../entities/Category";

export interface ICreateCategoryDTO {
  user_id: string;
  title: string;
  color: string;
}

export interface ICategoriesRepository {
  create({ user_id, title, color }: ICreateCategoryDTO): Promise<Category>
  listById(id: string): Promise<Category[]>
  findByTitle(user_id: string, title: string): Promise<Category | null>
  findByColor(user_id: string, color: string): Promise<Category | null>
  findById(user_id: string, category_id: string): Promise<Category | null>
  delete(category_id: string): Promise<void>
}
