import { ICreateCommentDTO } from "../dtos/ICreateCommentDTO";
import { Comment } from "../entities/Comment";

export interface ICommentsRepository {
  create({ todo_id, user_id, comment }: ICreateCommentDTO): Promise<Comment>
  findById(todo_id: string, comment_id: string): Promise<Comment | null>
  delete(todo_id: string, comment_id: string): Promise<void>
}
