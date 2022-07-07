import { inject, injectable } from "tsyringe";
import { compare } from 'bcrypt'
import { sign } from 'jsonwebtoken'

import { IUsersRepository } from "../../repositories/IUsersRepository";
import { AppError } from "../../../../errors/AppError";

interface IRequest {
  email: string;
  password: string;
}

interface IResponse {
  token: string;
  user: {
    name: string;
    email: string;
  }
}

@injectable()
export class AuthenticateUserUseCase {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository
  ) {}

  async execute({ email, password }: IRequest): Promise<IResponse> {
    const user = await this.usersRepository.findByEmail(email)

    if (!user) {
      throw new AppError('Invalid email or password')
    }

    const passwordsMatch = await compare(password, user.password)

    if (!passwordsMatch) {
      throw new AppError('Invalid email or password')
    }

    const token = sign({}, process.env.SECRET_KEY as string, {
      subject: user.id,
      expiresIn: '1d'
    })

    const serializedUser = {
      name: user.name,
      email: user.email
    }

    return { user: serializedUser, token }
  }
}
