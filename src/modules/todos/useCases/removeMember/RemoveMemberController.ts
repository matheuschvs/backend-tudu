import { Request, Response } from "express";
import { container } from "tsyringe";

import { RemoveMemberUseCase } from "./RemoveMemberUseCase";

export class RemoveMemberController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { todo_id, member_id } = request.params
    const { id: user_id } = request.user

    const removeMemberUseCase = container.resolve(RemoveMemberUseCase)

    await removeMemberUseCase.execute({ user_id, todo_id, member_id })

    return response.status(204).send()
  }
}
