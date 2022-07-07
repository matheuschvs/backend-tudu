import { inject, injectable } from "tsyringe";
import { hash } from 'bcrypt'

import { User } from "../../entities/User";
import { IUsersRepository } from "../../repositories/IUsersRepository";
import { AppError } from "../../../../errors/AppError";

interface IRequest {
  name: string;
  email: string;
  password: string;
}

@injectable()
export class CreateUserUseCase {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository
  ) {}

  async execute({ name, email, password }: IRequest): Promise<User> {
    name = name.toLowerCase()
    email = email.toLowerCase()

    const emailAlreadyExists = await this.usersRepository.findByEmail(email)

    if (emailAlreadyExists) {
      throw new AppError('User already registered', 409)
    }

    const hashedPassword = await hash(password, 8)

    const user = await this.usersRepository.create(
      {
        name,
        email,
        password: hashedPassword
      })

    return user
  }
}
