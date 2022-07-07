import { Request, Response } from "express";
import { container } from "tsyringe";

import { RemoveFileUseCase } from "./RemoveFileUseCase";

export class RemoveFileController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { todo_id, file_id } = request.params
    const { id: user_id } = request.user

    const removeFileUseCase = container.resolve(RemoveFileUseCase)

    await removeFileUseCase.execute({ user_id, todo_id, file_id })

    return response.status(204).send()
  }
}
