import { inject, injectable } from "tsyringe";

import { AppError } from "../../../../errors/AppError";
import { User } from "../../../users/entities/User";
import { IUsersRepository } from "../../../users/repositories/IUsersRepository";

import { ITodosRepository } from "../../repositories/ITodosRepository";

interface IRequest {
  user_id: string;
  todo_id: string;
  member_id: string;
}

@injectable()
export class AddMemberUseCase {
  constructor(
    @inject('TodosRepository')
    private todosRepository: ITodosRepository,
    @inject('UsersRepository')
    private usersRepository: IUsersRepository
  ) {}

  async execute({ user_id, todo_id, member_id }: IRequest): Promise<void> {
    const todo = await this.todosRepository.findById(todo_id)

    if (!todo) {
      throw new AppError('Invalid todo', 404)
    }

    if (!todo.users.some(user => user.id === user_id)) {
      throw new AppError('Forbidden', 403)
    }

    if (todo.users.some(user => user.id === member_id)) {
      throw new AppError('User already added', 409)
    }

    const user = await this.usersRepository.findById(member_id) as User

    await this.todosRepository.addMember(todo_id, user)
  }
}
