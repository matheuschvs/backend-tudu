import { inject, injectable } from "tsyringe";

import { AppError } from "../../../../errors/AppError";
import { Comment } from "../../entities/Comment";

import { ICommentsRepository } from "../../repositories/ICommentsRepository";
import { ITodosRepository } from "../../repositories/ITodosRepository";

interface IRequest {
  user_id: string;
  todo_id: string;
  comment: string;
}

@injectable()
export class AddCommentUseCase {
  constructor(
    @inject('CommentsRepository')
    private commentsRepository: ICommentsRepository,
    @inject('TodosRepository')
    private TodosRepository: ITodosRepository
  ) {}

  async execute({ user_id, todo_id, comment }: IRequest): Promise<Comment> {
    const todo = await this.TodosRepository.findById(todo_id)

    if (!todo) {
      throw new AppError('Invalid todo', 404)
    }

    if (!todo.users.some(user => user.id === user_id)) {
      throw new AppError('Forbidden', 403)
    }

    const createdComment = await this.commentsRepository.create({
      user_id,
      todo_id,
      comment
    })

    return createdComment
  }
}
