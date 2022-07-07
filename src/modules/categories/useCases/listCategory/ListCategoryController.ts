import { Request, Response } from "express";
import { container } from "tsyringe";

import { ListCategoryUseCase } from "./ListCategoryUseCase";

export class ListCategoryController {
  async handle(request: Request, response: Response) {
    const { id: user_id } = request.user
    const { id: category_id } = request.params

    const listCategoryUseCase = container.resolve(ListCategoryUseCase)

    const category = await listCategoryUseCase.execute({
      user_id,
      category_id
    })

    return response.json(category)
  }
}
