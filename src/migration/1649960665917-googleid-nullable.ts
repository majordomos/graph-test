import {MigrationInterface, QueryRunner} from "typeorm";

export class googleidNullable1649960665917 implements MigrationInterface {
    name = 'googleidNullable1649960665917'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "googleId" DROP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "googleId" SET NOT NULL`);
    }

}
