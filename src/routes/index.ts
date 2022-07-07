import { Router } from 'express'

import { sessionsRoutes } from './sessions.routes'
import { usersRoutes } from './users.routes'
import { categoriesRoutes } from './categories.routes'
import { todosRoutes } from './todos.routes'

export const router = Router()

router.use('/sessions', sessionsRoutes)
router.use('/users', usersRoutes)
router.use('/categories', categoriesRoutes)
router.use('/todos', todosRoutes)
