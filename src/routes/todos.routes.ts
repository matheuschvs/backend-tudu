import { Router } from 'express'
import multer from 'multer'

import { upload as uploadConfig } from '../config/upload'

import { ensureAuthenticated } from '../middlewares/ensureAuthenticated'

import { AddMemberController } from '../modules/todos/useCases/addMember/AddMemberController'
import { AddTaskController } from '../modules/todos/useCases/addTask/AddTaskController'
import { AddCommentController } from '../modules/todos/useCases/addComment/AddCommentController'
import { DeleteCommentController } from '../modules/todos/useCases/deleteComment/DeleteCommentController'
import { UpdateTaskController } from '../modules/todos/useCases/updateTask/UpdateTaskController'
import { DeleteTaskController } from '../modules/todos/useCases/deleteTask/DeleteTaskController'
import { RemoveMemberController } from '../modules/todos/useCases/removeMember/RemoveMemberController'
import { CreateTodoController } from '../modules/todos/useCases/createTodo/CreateTodoController'
import { DeleteTodoController } from '../modules/todos/useCases/deleteTodo/DeleteTodoController'
import { ImportFileController } from '../modules/todos/useCases/importFile/ImportFileController'
import { ListTodoController } from '../modules/todos/useCases/listTodo/ListTodoController'
import { ListTodosController } from '../modules/todos/useCases/listTodos/ListTodosController'
import { RemoveFileController } from '../modules/todos/useCases/removeFile/RemoveFileController'
import { UpdateTodoController } from '../modules/todos/useCases/updateTodo/UpdateTodoController'

export const todosRoutes = Router()

const upload = multer(uploadConfig('./tmp'))

const listTodosController = new ListTodosController()
const listTodoController = new ListTodoController()
const importFileController = new ImportFileController()
const createTodoController = new CreateTodoController()
const addMemberController = new AddMemberController()
const addTaskController = new AddTaskController()
const addCommentController = new AddCommentController()
const deleteCommentController = new DeleteCommentController()
const updateTaskController = new UpdateTaskController()
const deleteTaskController = new DeleteTaskController()
const updateTodoController = new UpdateTodoController()
const removeFileController = new RemoveFileController()
const deleteTodoController = new DeleteTodoController()
const removeMemberController = new RemoveMemberController()

todosRoutes.use(ensureAuthenticated)

todosRoutes.get('/', listTodosController.handle)
todosRoutes.get('/:todo_id', listTodoController.handle)
todosRoutes.post('/', createTodoController.handle)
todosRoutes.post('/:todo_id/files', upload.single('todo_file'), importFileController.handle)
todosRoutes.post('/:todo_id/members', addMemberController.handle)
todosRoutes.post('/:todo_id/todo-tasks', addTaskController.handle)
todosRoutes.post('/:todo_id/comments', addCommentController.handle)
todosRoutes.put('/:todo_id/todo-tasks/:task_id', updateTaskController.handle)
todosRoutes.put('/:todo_id', updateTodoController.handle)
todosRoutes.delete('/:todo_id/files/:file_id', removeFileController.handle)
todosRoutes.delete('/:todo_id', deleteTodoController.handle)
todosRoutes.delete('/:todo_id/members/:member_id', removeMemberController.handle)
todosRoutes.delete('/:todo_id/todo-tasks/:task_id', deleteTaskController.handle)
todosRoutes.delete('/:todo_id/comments/:comment_id', deleteCommentController.handle)
