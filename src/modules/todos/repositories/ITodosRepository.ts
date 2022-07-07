import { User } from "../../users/entities/User";
import { ICreateTodoDTO } from "../dtos/ICreateTodoDTO";
import { IListTodoDTO } from "../dtos/IListTodoDTO";
import { IUpdateTodoDTO } from "../dtos/IUpdateTodoDTO";
import { Todo } from "../entities/Todo";
import { TodoTask } from "../entities/TodoTask";

export interface ITodosRepository {
  create({ user_id, title, description, deadline, category_id }: ICreateTodoDTO): Promise<Todo>
  findById(todo_id: string): Promise<Todo | null>
  findByTitle(user_id: string, title: string): Promise<Todo | null>
  list({ user_id, status, limit, offset }: IListTodoDTO): Promise<Todo[]>
  update({ title, description, status, deadline, category_id, todo_id }: IUpdateTodoDTO): Promise<void>
  addMember(todo_id: string, member: User): Promise<void>
  removeMember(todo_id: string, member: User): Promise<void>
  delete(todo_id: string): Promise<void>
}
