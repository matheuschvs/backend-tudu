import { Request, Response } from "express";
import { container } from "tsyringe";

import { AppError } from "../../../../errors/AppError";

import { UpdateTodoUseCase } from "./UpdateTodoUseCase";

export class UpdateTodoController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id: user_id } = request.user
    const { todo_id } = request.params
    const { title, description, status, deadline, category_id } = request.body

    if (status !== 'WAITING' && status !== 'DONE' && status !== undefined) {
      throw new AppError('Wrong status')
    }

    const updateTodoUseCase = container.resolve(UpdateTodoUseCase)

    await updateTodoUseCase.execute({
      user_id,
      title,
      description,
      status,
      deadline,
      category_id,
      todo_id
    })

    return response.status(204).send()
  }
}
