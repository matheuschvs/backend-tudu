import { Request, Response } from "express";
import { container } from "tsyringe";

import { AppError } from "../../../../errors/AppError";

import { ListUserUseCase } from "./ListUserUseCase";

export class ListUserController {
  async handle(request: Request, response: Response) {
    const { email } = request.query

    if (!email) {
      throw new AppError('Missing email query')
    }

    const listUserUseCase = container.resolve(ListUserUseCase)

    const user = await listUserUseCase.execute(String(email))

    return response.json(user)
  }
}
