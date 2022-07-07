import { Request, Response } from "express";
import { container } from "tsyringe";

import { DeleteCommentUseCase } from "./DeleteCommentUseCase";

export class DeleteCommentController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id: user_id } = request.user
    const { todo_id, comment_id } = request.params


    const deleteCommentUseCase = container.resolve(DeleteCommentUseCase)

    await deleteCommentUseCase.execute({
      user_id,
      todo_id,
      comment_id
    })

    return response.status(204).send()
  }
}
