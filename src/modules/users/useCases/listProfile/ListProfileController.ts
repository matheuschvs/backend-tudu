import { Request, Response } from "express";
import { container } from "tsyringe";

import { ListProfileUseCase } from "./ListProfileUseCase";

export class ListProfileController {
  async handle(request: Request, response: Response) {
    const { id: user_id } = request.user

    const listProfileUseCase = container.resolve(ListProfileUseCase)

    const user = await listProfileUseCase.execute(user_id)

    return response.json(user)
  }
}
