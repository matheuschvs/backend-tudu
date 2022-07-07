import { Request, Response } from "express";
import { container } from "tsyringe";

import { AddTaskUseCase } from "./AddTaskUseCase";

export class AddTaskController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id: user_id } = request.user
    const { todo_id } = request.params
    const { title } = request.body

    const addTaskUseCase = container.resolve(AddTaskUseCase)

    const task = await addTaskUseCase.execute({ user_id, todo_id, title })

    return response.status(201).json(task)
  }
}
