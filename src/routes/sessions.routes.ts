import { Router } from 'express'

import { AuthenticateUserController } from '../modules/users/useCases/authenticateUser/AuthenticateUserController'

export const sessionsRoutes = Router()

const authenticateUserController = new AuthenticateUserController()

sessionsRoutes.post('/', authenticateUserController.handle)
