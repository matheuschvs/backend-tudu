import { MigrationInterface, QueryRunner } from "typeorm";

export class createTables1657099389534 implements MigrationInterface {
  name = 'createTables1657099389534'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE TABLE "comments" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "comment" character varying(128) NOT NULL, "userId" uuid NOT NULL, "todoId" uuid NOT NULL, CONSTRAINT "PK_8bf68bc960f2b69e818bdb90dcb" PRIMARY KEY ("id"))`);
    await queryRunner.query(`CREATE TABLE "users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(128) NOT NULL, "email" character varying(128) NOT NULL, "password" character varying(256) NOT NULL, CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
    await queryRunner.query(`CREATE TABLE "todo_tasks" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "status" character varying(30) NOT NULL, "title" character varying(30) NOT NULL, "todoId" uuid NOT NULL, CONSTRAINT "UQ_4ad6af4d9d95c07721f72e42573" UNIQUE ("title"), CONSTRAINT "PK_541c2b415653fceab79e48110a1" PRIMARY KEY ("id"))`);
    await queryRunner.query(`CREATE TABLE "todos" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "status" character varying(30) NOT NULL, "title" character varying(30) NOT NULL, "description" character varying(256), "deadline" TIMESTAMP WITH TIME ZONE NOT NULL, "categoryId" uuid NOT NULL, CONSTRAINT "UQ_c427d5928f463be5c8965e0d684" UNIQUE ("title"), CONSTRAINT "PK_ca8cafd59ca6faaf67995344225" PRIMARY KEY ("id"))`);
    await queryRunner.query(`CREATE TABLE "categories" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "title" character varying(30) NOT NULL, "color" character varying(30) NOT NULL, "userId" uuid NOT NULL, CONSTRAINT "UQ_aa79448dc3e959720ab4c13651d" UNIQUE ("title"), CONSTRAINT "UQ_ee3dfe2d84c458aed5c519ccaa1" UNIQUE ("color"), CONSTRAINT "PK_24dbc6126a28ff948da33e97d3b" PRIMARY KEY ("id"))`);
    await queryRunner.query(`CREATE TABLE "users_todos_todos" ("usersId" uuid NOT NULL, "todosId" uuid NOT NULL, CONSTRAINT "PK_95d622ac6a2ba0822dc94a430a0" PRIMARY KEY ("usersId", "todosId"))`);
    await queryRunner.query(`CREATE INDEX "IDX_1a5839f83b3f3607c4d89a9f7d" ON "users_todos_todos" ("usersId") `);
    await queryRunner.query(`CREATE INDEX "IDX_f259c163de8ba16df48f341935" ON "users_todos_todos" ("todosId") `);
    await queryRunner.query(`ALTER TABLE "comments" ADD CONSTRAINT "FK_7e8d7c49f218ebb14314fdb3749" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    await queryRunner.query(`ALTER TABLE "comments" ADD CONSTRAINT "FK_f62b0c6cd2937308c6dbfe27819" FOREIGN KEY ("todoId") REFERENCES "todos"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    await queryRunner.query(`ALTER TABLE "todo_tasks" ADD CONSTRAINT "FK_509416a920de6bc01ee4b36158d" FOREIGN KEY ("todoId") REFERENCES "todos"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    await queryRunner.query(`ALTER TABLE "todos" ADD CONSTRAINT "FK_b875cb9ebf0be6ff05ff0174926" FOREIGN KEY ("categoryId") REFERENCES "categories"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    await queryRunner.query(`ALTER TABLE "categories" ADD CONSTRAINT "FK_13e8b2a21988bec6fdcbb1fa741" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    await queryRunner.query(`ALTER TABLE "users_todos_todos" ADD CONSTRAINT "FK_1a5839f83b3f3607c4d89a9f7d7" FOREIGN KEY ("usersId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    await queryRunner.query(`ALTER TABLE "users_todos_todos" ADD CONSTRAINT "FK_f259c163de8ba16df48f341935a" FOREIGN KEY ("todosId") REFERENCES "todos"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "users_todos_todos" DROP CONSTRAINT "FK_f259c163de8ba16df48f341935a"`);
    await queryRunner.query(`ALTER TABLE "users_todos_todos" DROP CONSTRAINT "FK_1a5839f83b3f3607c4d89a9f7d7"`);
    await queryRunner.query(`ALTER TABLE "categories" DROP CONSTRAINT "FK_13e8b2a21988bec6fdcbb1fa741"`);
    await queryRunner.query(`ALTER TABLE "todos" DROP CONSTRAINT "FK_b875cb9ebf0be6ff05ff0174926"`);
    await queryRunner.query(`ALTER TABLE "todo_tasks" DROP CONSTRAINT "FK_509416a920de6bc01ee4b36158d"`);
    await queryRunner.query(`ALTER TABLE "comments" DROP CONSTRAINT "FK_f62b0c6cd2937308c6dbfe27819"`);
    await queryRunner.query(`ALTER TABLE "comments" DROP CONSTRAINT "FK_7e8d7c49f218ebb14314fdb3749"`);
    await queryRunner.query(`DROP INDEX "public"."IDX_f259c163de8ba16df48f341935"`);
    await queryRunner.query(`DROP INDEX "public"."IDX_1a5839f83b3f3607c4d89a9f7d"`);
    await queryRunner.query(`DROP TABLE "users_todos_todos"`);
    await queryRunner.query(`DROP TABLE "categories"`);
    await queryRunner.query(`DROP TABLE "todos"`);
    await queryRunner.query(`DROP TABLE "todo_tasks"`);
    await queryRunner.query(`DROP TABLE "users"`);
    await queryRunner.query(`DROP TABLE "comments"`);
  }

}
