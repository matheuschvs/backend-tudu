import { container } from 'tsyringe'

import { ICategoriesRepository } from '../../modules/categories/repositories/ICategoriesRepository'
import { IUsersRepository } from '../../modules/users/repositories/IUsersRepository'
import { IFilesRepository } from '../../modules/todos/repositories/IFilesRepository'
import { ITodosRepository } from '../../modules/todos/repositories/ITodosRepository'
import { ITodoTasksRepository } from '../../modules/todos/repositories/ITodoTasksRepository'
import { ICommentsRepository } from '../../modules/todos/repositories/ICommentsRepository'

import { CategoriesRepository } from '../../modules/categories/repositories/implementations/CategoriesRepository'
import { UsersRepository } from '../../modules/users/repositories/implementations/UsersRepository'
import { FilesRepository } from '../../modules/todos/repositories/implementations/FilesRepository'
import { TodosRepository } from '../../modules/todos/repositories/implementations/TodosRepository'
import { TodoTasksRepository } from '../../modules/todos/repositories/implementations/TodoTasksRepository'
import { CommentsRepository } from '../../modules/todos/repositories/implementations/CommentsRepository'

container.registerSingleton<ICategoriesRepository>(
  'CategoriesRepository',
  CategoriesRepository
)

container.registerSingleton<IUsersRepository>(
  'UsersRepository',
  UsersRepository
)

container.registerSingleton<IFilesRepository>(
  'FilesRepository',
  FilesRepository
)

container.registerSingleton<ITodosRepository>(
  'TodosRepository',
  TodosRepository
)

container.registerSingleton<ITodoTasksRepository>(
  'TodoTasksRepository',
  TodoTasksRepository
)

container.registerSingleton<ICommentsRepository>(
  'CommentsRepository',
  CommentsRepository
)
