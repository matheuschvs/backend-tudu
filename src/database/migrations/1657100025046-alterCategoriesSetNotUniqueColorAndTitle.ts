import { MigrationInterface, QueryRunner } from "typeorm";

export class alterCategoriesSetNotUniqueColorAndTitle1657100025046 implements MigrationInterface {
    name = 'alterCategoriesSetNotUniqueColorAndTitle1657100025046'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "categories" DROP CONSTRAINT "UQ_aa79448dc3e959720ab4c13651d"`);
        await queryRunner.query(`ALTER TABLE "categories" DROP CONSTRAINT "UQ_ee3dfe2d84c458aed5c519ccaa1"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "categories" ADD CONSTRAINT "UQ_ee3dfe2d84c458aed5c519ccaa1" UNIQUE ("color")`);
        await queryRunner.query(`ALTER TABLE "categories" ADD CONSTRAINT "UQ_aa79448dc3e959720ab4c13651d" UNIQUE ("title")`);
    }

}
