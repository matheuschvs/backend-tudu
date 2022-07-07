import { Request, Response } from "express";
import { container } from "tsyringe";

import { AppError } from "../../../../errors/AppError";

import { ListTodosUseCase } from "./ListTodosUseCase";

export class ListTodosController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { status, limit = 9999, offset = 0 } = request.query
    const { id: user_id } = request.user

    if (status !== 'WAITING' && status !== 'DONE' && status !== undefined) {
      throw new AppError('Wrong status query')
    }

    const listTodosUseCase = container.resolve(ListTodosUseCase)

    const todos = await listTodosUseCase.execute({
      user_id,
      status,
      limit: +limit,
      offset: +offset
    })

    return response.json(todos)
  }
}
