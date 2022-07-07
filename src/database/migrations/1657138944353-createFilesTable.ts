import { MigrationInterface, QueryRunner } from "typeorm";

export class createFilesTable1657138944353 implements MigrationInterface {
    name = 'createFilesTable1657138944353'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "files" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "file" character varying(256) NOT NULL, "todoId" uuid NOT NULL, CONSTRAINT "PK_6c16b9093a142e0e7613b04a3d9" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "files" ADD CONSTRAINT "FK_3e4bcbd8fe38213cae99b763522" FOREIGN KEY ("todoId") REFERENCES "todos"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "files" DROP CONSTRAINT "FK_3e4bcbd8fe38213cae99b763522"`);
        await queryRunner.query(`DROP TABLE "files"`);
    }

}
