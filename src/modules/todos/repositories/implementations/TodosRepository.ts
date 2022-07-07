import { Repository } from "typeorm";

import { AppDataSource } from "../../../../database";
import { User } from "../../../users/entities/User";
import { ICreateTodoDTO } from "../../dtos/ICreateTodoDTO";
import { IListTodoDTO } from "../../dtos/IListTodoDTO";
import { IUpdateTodoDTO } from "../../dtos/IUpdateTodoDTO";
import { Todo } from "../../entities/Todo";
import { ITodosRepository } from "../ITodosRepository";

export class TodosRepository implements ITodosRepository {
  private repository: Repository<Todo>

  constructor() {
    this.repository = AppDataSource.getRepository(Todo)
  }

  async list({ user_id, status, limit, offset }: IListTodoDTO): Promise<Todo[]> {
    const todos = await this.repository.find({
      skip: offset,
      take: limit,
      where: {
        users: [{ id: user_id }],
        status
      }
    })

    return todos
  }

  async create({
    user_id,
    title,
    description,
    deadline,
    category_id
  }: ICreateTodoDTO): Promise<Todo> {
    const createdTodo = this.repository.create({
      users: [{ id: user_id }],
      title,
      description,
      status: 'WAITING',
      deadline,
      category: { id: category_id }
    })

    const todo = await this.repository.save(createdTodo)

    return todo
  }

  async findById(todo_id: string): Promise<Todo | null> {
    const todo = await this.repository.findOneBy({ id: todo_id })

    return todo
  }

  async findByTitle(user_id: string, title: string): Promise<Todo | null> {
    const todo = await this.repository.findOneBy({
      users: [{ id: user_id }],
      title
    })

    return todo
  }

  async addMember(todo_id: string, member: User): Promise<void> {
    const todo = await this.repository.findOne({
      where: {
        id: todo_id
      },
      relations: {
        users: true
      }
    }) as Todo

    todo.users.push(member)
    await this.repository.save(todo)
  }

  async removeMember(todo_id: string, member: User): Promise<void> {
    const todo = await this.repository.findOne({
      where: {
        id: todo_id
      },
      relations: {
        users: true
      }
    }) as Todo

    const index = todo.users.findIndex(user => user.id === member.id)
    todo.users.splice(index, 1)
    await this.repository.save(todo)
  }

  async update({
    title,
    description,
    status,
    deadline,
    category_id,
    todo_id
  }: IUpdateTodoDTO): Promise<void> {
    await this.repository.update({
      id: todo_id,
    }, {
      title,
      description,
      status,
      deadline,
      category: { id: category_id }
    })
  }

  async delete(todo_id: string): Promise<void> {
    await this.repository.delete({ id: todo_id })
  }
}
