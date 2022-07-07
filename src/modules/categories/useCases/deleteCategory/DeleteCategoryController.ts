import { Request, Response } from "express";
import { container } from "tsyringe";

import { DeleteCategoryUseCase } from "./DeleteCategoryUseCase";

export class DeleteCategoryController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id: user_id } = request.user
    const { id: category_id } = request.params

    const deleteCategoryUseCase = container.resolve(DeleteCategoryUseCase)

    await deleteCategoryUseCase.execute({ user_id, category_id })

    return response.status(204).send()
  }
}
