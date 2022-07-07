import { Request, Response } from "express";
import { container } from "tsyringe";

import { DeleteTaskUseCase } from "./DeleteTaskUseCase";

export class DeleteTaskController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id: user_id } = request.user
    const { todo_id, task_id } = request.params


    const deleteTaskUseCase = container.resolve(DeleteTaskUseCase)

    await deleteTaskUseCase.execute({
      user_id,
      todo_id,
      task_id
    })

    return response.status(204).send()
  }
}
