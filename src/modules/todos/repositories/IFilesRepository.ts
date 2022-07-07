import { IInsertFileDTO } from "../dtos/IInsertFileDTO";
import { File } from "../entities/File";

export interface IFilesRepository {
  insert({ todo_id, file }: IInsertFileDTO): Promise<void>
  delete(file_id: string): Promise<void>
  findById(file_id: string): Promise<File | null>
}
