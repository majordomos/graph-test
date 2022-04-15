import {MigrationInterface, QueryRunner} from "typeorm";

export class mods1649958445460 implements MigrationInterface {
    name = 'mods1649958445460'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "role" DROP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "role" SET NOT NULL`);
    }

}
