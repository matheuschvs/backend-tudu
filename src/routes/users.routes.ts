import { Router } from 'express'

import { ensureAuthenticated } from '../middlewares/ensureAuthenticated'

import { CreateUserController } from '../modules/users/useCases/createUser/CreateUserController'
import { ListUserController } from '../modules/users/useCases/listUser/ListUserController'
import { ListProfileController } from '../modules/users/useCases/listProfile/ListProfileController'

export const usersRoutes = Router()

const createUserController = new CreateUserController()
const listUserController = new ListUserController()
const listProfileController = new ListProfileController()

usersRoutes.post('/', createUserController.handle)
usersRoutes.get('/', ensureAuthenticated, listUserController.handle)
usersRoutes.get('/me', ensureAuthenticated, listProfileController.handle)
