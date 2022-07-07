import { Repository } from 'typeorm';
import { AppDataSource } from '../../../../database';
import { ICreateUserDTO } from '../../dtos/ICreateUserDTO';
import { User } from '../../entities/User';
import { IUsersRepository } from '../IUsersRepository';

export class UsersRepository implements IUsersRepository {
  private repository: Repository<User>

  constructor() {
    this.repository = AppDataSource.getRepository(User)
  }

  async create({ name, email, password }: ICreateUserDTO): Promise<User> {
    const createdUser = this.repository.create({ name, email, password })

    const user = await this.repository.save(createdUser)

    return user
  }

  async findByEmail(email: string): Promise<User | null> {
    return await this.repository.findOneBy({ email })
  }

  async findById(id: string): Promise<User | null> {
    return await this.repository.findOneBy({ id })
  }
}
