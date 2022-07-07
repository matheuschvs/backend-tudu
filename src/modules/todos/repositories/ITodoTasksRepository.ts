import { ICreateTodoTaskDTO } from "../dtos/ICreateTodoTaskDTO";
import { IUpdateTodoTaskDTO } from "../dtos/IUpdateTodoTaskDTO";
import { TodoTask } from "../entities/TodoTask";

export interface ITodoTasksRepository {
  create({ todo_id, title }: ICreateTodoTaskDTO): Promise<TodoTask>
  findById(todo_id: string, task_id: string): Promise<TodoTask | null>
  findByTitle(todo_id: string, title: string): Promise<TodoTask | null>
  update({ title, status, todo_id, task_id }: IUpdateTodoTaskDTO): Promise<void>
  delete(todo_id: string, task_id: string): Promise<void>
}
