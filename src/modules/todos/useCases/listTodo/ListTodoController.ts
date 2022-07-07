import { Request, Response } from "express";
import { container } from "tsyringe";

import { ListTodoUseCase } from "./ListTodoUseCase";

export class ListTodoController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id: user_id } = request.user
    const { todo_id } = request.params

    const listTodoUseCase = container.resolve(ListTodoUseCase)

    const todo = await listTodoUseCase.execute({ user_id, todo_id })

    return response.json(todo)
  }
}
