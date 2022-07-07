import { ICreateUserDTO } from '../dtos/ICreateUserDTO';
import { User } from '../entities/User'

export interface IUsersRepository {
  create({ name, email, password }: ICreateUserDTO): Promise<User>;
  findByEmail(email: string): Promise<User | null>;
  findById(id: string): Promise<User | null>;
}
