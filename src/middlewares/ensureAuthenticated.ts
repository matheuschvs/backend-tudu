import { NextFunction, Request, Response } from "express";
import { verify } from 'jsonwebtoken'

import { AppError } from "../errors/AppError";

import { UsersRepository } from "../modules/users/repositories/implementations/UsersRepository";

export async function ensureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const authorization = request.headers.authorization

  if (!authorization) {
    throw new AppError('Unauthorized', 401)
  }

  const [, token] = authorization.split(' ')

  try {
    const { sub: user_id } = verify(token, process.env.SECRET_KEY as string)

    const usersRepository = new UsersRepository()

    const user = await usersRepository.findById(user_id as string)

    if (!user) {
      throw new AppError('User does not exist', 404)
    }

    request.user = {
      id: user_id as string
    }

    next()
  } catch (err) {
    if (err instanceof AppError) {
      throw new AppError(err.message, err.statusCode)
    }

    throw new AppError('Invalid token', 401)
  }
}
