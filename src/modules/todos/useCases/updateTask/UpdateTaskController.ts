import { Request, Response } from "express";
import { container } from "tsyringe";

import { AppError } from "../../../../errors/AppError";

import { UpdateTaskUseCase } from "./UpdateTaskUseCase";

export class UpdateTaskController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id: user_id } = request.user
    const { todo_id, task_id } = request.params
    const { title, status } = request.body

    if (status !== 'WAITING' && status !== 'DONE' && status !== undefined) {
      throw new AppError('Wrong status')
    }

    const updateTaskUseCase = container.resolve(UpdateTaskUseCase)

    await updateTaskUseCase.execute({
      user_id,
      title,
      status,
      todo_id,
      task_id
    })

    return response.status(204).send()
  }
}
