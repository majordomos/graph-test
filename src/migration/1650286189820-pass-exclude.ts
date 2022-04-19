import {MigrationInterface, QueryRunner} from "typeorm";

export class passExclude1650286189820 implements MigrationInterface {
    name = 'passExclude1650286189820'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ADD "password" character varying(300)`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "password"`);
    }

}
