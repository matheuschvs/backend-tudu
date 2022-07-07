import { Router } from 'express'

import { ensureAuthenticated } from '../middlewares/ensureAuthenticated'

import { CreateCategoryController } from '../modules/categories/useCases/createCategory/CreateCategoryController'
import { ListCategoriesController } from '../modules/categories/useCases/listCategories/ListCategoriesController'
import { ListCategoryController } from '../modules/categories/useCases/listCategory/ListCategoryController'
import { DeleteCategoryController } from '../modules/categories/useCases/deleteCategory/DeleteCategoryController'

export const categoriesRoutes = Router()

const createCategoryController = new CreateCategoryController()
const listCategoriesController = new ListCategoriesController()
const listCategoryController = new ListCategoryController()
const deleteCategoryController = new DeleteCategoryController()

categoriesRoutes.use(ensureAuthenticated)

categoriesRoutes.post('/', createCategoryController.handle)
categoriesRoutes.get('/', listCategoriesController.handle)
categoriesRoutes.get('/:id', listCategoryController.handle)
categoriesRoutes.delete('/:id', deleteCategoryController.handle)
