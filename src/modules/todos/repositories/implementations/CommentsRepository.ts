import { Repository } from "typeorm";

import { AppDataSource } from "../../../../database";

import { ICreateCommentDTO } from "../../dtos/ICreateCommentDTO";
import { Comment } from "../../entities/Comment";
import { ICommentsRepository } from "../ICommentsRepository";

export class CommentsRepository implements ICommentsRepository {
  private repository: Repository<Comment>

  constructor() {
    this.repository = AppDataSource.getRepository(Comment)
  }

  async create({ todo_id, user_id, comment }: ICreateCommentDTO): Promise<Comment> {
    const createdComment = this.repository.create({
      comment,
      user: { id: user_id },
      todo: { id: todo_id }
    })

    const data = await this.repository.save(createdComment)

    return data
  }

  async findById(todo_id: string, comment_id: string): Promise<Comment | null> {
    const comment = await this.repository.findOneBy({
      todo: { id: todo_id },
      id: comment_id
    })

    return comment
  }

  async delete(todo_id: string, comment_id: string): Promise<void> {
    await this.repository.delete({
      todo: { id: todo_id },
      id: comment_id
    })
  }
}
