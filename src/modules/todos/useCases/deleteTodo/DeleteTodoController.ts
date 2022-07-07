import { Request, Response } from "express";
import { container } from "tsyringe";

import { DeleteTodoUseCase } from "./DeleteTodoUseCase";

export class DeleteTodoController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id: user_id } = request.user
    const { todo_id } = request.params

    const deleteTodoUseCase = container.resolve(DeleteTodoUseCase)

    await deleteTodoUseCase.execute({ user_id, todo_id })

    return response.status(204).send()
  }
}
