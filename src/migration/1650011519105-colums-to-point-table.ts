import {MigrationInterface, QueryRunner} from "typeorm";

export class columsToPointTable1650011519105 implements MigrationInterface {
    name = 'columsToPointTable1650011519105'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "point" ADD "result_value" real NOT NULL`);
        await queryRunner.query(`ALTER TABLE "point" ADD "createDateTime" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "point" DROP COLUMN "createDateTime"`);
        await queryRunner.query(`ALTER TABLE "point" DROP COLUMN "result_value"`);
    }

}
