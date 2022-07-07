import { Request, Response } from 'express';
import { container } from 'tsyringe'

import { CreateCategoryUseCase } from './CreateCategoryUseCase';

export class CreateCategoryController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { title, color } = request.body
    const { id } = request.user

    const createCategoryUseCase = container.resolve(CreateCategoryUseCase)

    const category = await createCategoryUseCase.execute(
      {
        user_id: id,
        title,
        color
      })

    return response.status(201).json(category)
  }
}
