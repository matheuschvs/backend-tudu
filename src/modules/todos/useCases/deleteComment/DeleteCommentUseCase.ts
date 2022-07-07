import { inject, injectable } from "tsyringe";

import { AppError } from "../../../../errors/AppError";

import { ITodosRepository } from "../../repositories/ITodosRepository";
import { ICommentsRepository } from "../../repositories/ICommentsRepository";

interface IRequest {
  user_id: string;
  todo_id: string;
  comment_id: string;
}

@injectable()
export class DeleteCommentUseCase {
  constructor(
    @inject('TodosRepository')
    private todosRepository: ITodosRepository,
    @inject('CommentsRepository')
    private commentsRepository: ICommentsRepository
  ) {}

  async execute({ user_id, todo_id, comment_id }: IRequest): Promise<void> {
    const todo = await this.todosRepository.findById(todo_id)

    if (!todo) {
      throw new AppError('Invalid todo', 404)
    }

    if (!todo.users.some(user => user.id === user_id)) {
      throw new AppError('Forbidden', 403)
    }

    const comment = await this.commentsRepository.findById(todo_id, comment_id)

    if (!comment) {
      throw new AppError('Comment not found', 404)
    }

    await this.commentsRepository.delete(todo_id, comment_id)
  }
}
