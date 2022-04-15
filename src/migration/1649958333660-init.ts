import {MigrationInterface, QueryRunner} from "typeorm";

export class init1649958333660 implements MigrationInterface {
    name = 'init1649958333660'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "user" ("id" SERIAL NOT NULL, "firstName" character varying(300) NOT NULL, "lastName" character varying(300) NOT NULL, "email" character varying(300) NOT NULL, "role" character varying(300) NOT NULL, "googleId" character varying(300) NOT NULL, CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "point" ("id" SERIAL NOT NULL, "x_value" integer NOT NULL, "y_value" integer NOT NULL, "userId" integer, CONSTRAINT "PK_391f59a9491a08961038a615371" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "point" ADD CONSTRAINT "FK_c01766b92e52572f0b871c24bb6" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "point" DROP CONSTRAINT "FK_c01766b92e52572f0b871c24bb6"`);
        await queryRunner.query(`DROP TABLE "point"`);
        await queryRunner.query(`DROP TABLE "user"`);
    }

}
