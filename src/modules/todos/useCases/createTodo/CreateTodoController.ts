import { Request, Response } from "express";
import { container } from "tsyringe";
import { CreateTodoUseCase } from "./CreateTodoUseCase";

export class CreateTodoController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { title, description, deadline, category_id } = request.body
    const { id: user_id } = request.user

    const createTodoUseCase = container.resolve(CreateTodoUseCase)

    const todo = await createTodoUseCase.execute({
      user_id,
      title,
      description,
      deadline,
      category_id
    })

    return response.status(201).json(todo)
  }
}
