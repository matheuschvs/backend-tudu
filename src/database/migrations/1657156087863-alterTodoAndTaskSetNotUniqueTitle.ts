import { MigrationInterface, QueryRunner } from "typeorm";

export class alterTodoAndTaskSetNotUniqueTitle1657156087863 implements MigrationInterface {
    name = 'alterTodoAndTaskSetNotUniqueTitle1657156087863'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "todo_tasks" DROP CONSTRAINT "UQ_4ad6af4d9d95c07721f72e42573"`);
        await queryRunner.query(`ALTER TABLE "todos" DROP CONSTRAINT "UQ_c427d5928f463be5c8965e0d684"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "todos" ADD CONSTRAINT "UQ_c427d5928f463be5c8965e0d684" UNIQUE ("title")`);
        await queryRunner.query(`ALTER TABLE "todo_tasks" ADD CONSTRAINT "UQ_4ad6af4d9d95c07721f72e42573" UNIQUE ("title")`);
    }

}
