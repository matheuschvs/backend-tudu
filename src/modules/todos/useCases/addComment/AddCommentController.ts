import { Request, Response } from "express";
import { container } from "tsyringe";

import { AddCommentUseCase } from "./AddCommentUseCase";

export class AddCommentController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id: user_id } = request.user
    const { todo_id } = request.params
    const { comment } = request.body

    const addCommentUseCase = container.resolve(AddCommentUseCase)

    const createdComment = await addCommentUseCase.execute({ user_id, todo_id, comment })

    return response.status(201).json(createdComment)
  }
}
