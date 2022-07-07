import { Repository } from "typeorm";
import { AppDataSource } from "../../../../database";

import { IInsertFileDTO } from "../../dtos/IInsertFileDTO";
import { File } from "../../entities/File";
import { IFilesRepository } from "../IFilesRepository";

export class FilesRepository implements IFilesRepository {
  private repository: Repository<File>

  constructor() {
    this.repository = AppDataSource.getRepository(File)
  }

  async insert({ todo_id, file }: IInsertFileDTO): Promise<void> {
    const createdFile = this.repository.create({
      todo: { id: todo_id },
      file: file
    })

    await this.repository.save(createdFile)
  }

  async findById(file_id: string): Promise<File | null> {
    const file = await this.repository.findOneBy({ id: file_id })

    return file
  }

  async delete(file_id: string): Promise<void> {
    await this.repository.delete({ id: file_id })
  }
}
