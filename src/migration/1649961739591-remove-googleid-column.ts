import {MigrationInterface, QueryRunner} from "typeorm";

export class removeGoogleidColumn1649961739591 implements MigrationInterface {
    name = 'removeGoogleidColumn1649961739591'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "googleId"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ADD "googleId" character varying(300)`);
    }

}
