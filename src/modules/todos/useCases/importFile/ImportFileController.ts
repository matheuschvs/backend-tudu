import { Request, Response } from "express";
import { container } from "tsyringe";

import { AppError } from "../../../../errors/AppError";

import { ImportFileUseCase } from "./ImportFileUseCase";

export class ImportFileController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id: user_id } = request.user
    const { todo_id } = request.params

    if (!request.file) {
      throw new AppError('Could not import file')
    }

    const file = request.file.filename

    const importFileUseCase = container.resolve(ImportFileUseCase)

    await importFileUseCase.execute({ user_id, todo_id, file })

    return response.status(204).send()
  }
}
