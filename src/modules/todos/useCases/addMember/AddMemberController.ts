import { Request, Response } from "express";
import { container } from "tsyringe";

import { AppError } from "../../../../errors/AppError";

import { AddMemberUseCase } from "./AddMemberUseCase";

export class AddMemberController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id: user_id } = request.user
    const { todo_id } = request.params
    const { member_id } = request.body

    const addMemberUseCase = container.resolve(AddMemberUseCase)

    await addMemberUseCase.execute({ user_id, todo_id, member_id })

    return response.status(204).send()
  }
}
